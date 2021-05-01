#include <wire.h>
#include <SPI.h>
#include <RH_RF69.h>
#include <Adafruit_MPL3115A2.h>

/*
  Reading the raw NMEA sentences from the Qwiic GPS module over I2C
  By: Nathan Seidle
  SparkFun Electronics
  Date: April 12th, 2017
  License: This code is public domain but you buy me a beer if you use this and we meet someday (Beerware license).

  This grabs the incoming NMEA sentences like GNGGA and GNRMC over I2C and outputs them to the serial
  monitor at 115200bps.

  We've included the library with this example so that you can get started immediately. For the other
  examples you'll need to install the SparkFun I2C GPS Arduino library from the Library manager.

  Hardware Connections:
  Attach a Qwiic shield to your RedBoard or Uno.
  Plug the Qwiic sensor into any port.
  PORT.print it out at 115200 baud to serial monitor.
*/

#include "SparkFun_I2C_GPS_Arduino_Library.h" //Use Library Manager or download here: https://github.com/sparkfun/SparkFun_I2C_GPS_Arduino_Library
I2CGPS myI2CGPS; //Hook object to the library

// #include "SparkFunBME280.h"
// BME280 mySensor;

#include "SparkFun_BNO080_Arduino_Library.h"
BNO080 myIMU;

#define RF69_FREQ 434.0

#if defined (__AVR_ATmega328P__)  // Feather 328P w/wing
  #define RFM69_INT     3  // 
  #define RFM69_CS      4  //
  #define RFM69_RST     2  // "A"
  #define LED           13
#endif

RH_RF69 rf69(RFM69_CS, RFM69_INT);

Adafruit_MPL3115A2 baro = Adafruit_MPL3115A2();

void setup()
{
  Serial.begin(9600);
  Serial.println(F("GTOP Read"));

  while (myI2CGPS.begin() == false)
  {
    Serial.println(F("GPS KO"));
    delay(500);
  }
  Serial.println(F("GPS OK"));

  Serial.println(F("Read BME280"));
  Wire.begin();
//  if (mySensor.beginI2C() == false) //Begin communication over I2C
//  {
//    Serial.println(F("BME280 KO"));
//    while(1); //Freeze
//  }

  Serial.println(F("BNO080 Read"));
  myIMU.begin();

  Wire.setClock(400000); //Increase I2C data rate to 400kHz

  myIMU.enableRotationVector(50); //Send data update every 50ms
  Serial.println(F("Rot vect en"));
  Serial.println(F("Out: i, j, k, real, accur"));

  myIMU.enableAccelerometer(50); //Send data update every 50ms  Serial.println(F("Accelerometer enabled"));
  Serial.println(F("Output in form x, y, z, in m/s^2"));

// INIZIO RADIO SETUP

  pinMode(RFM69_RST, OUTPUT);
  digitalWrite(RFM69_RST, LOW);

  Serial.println(F("RFM69 TX Test"));

  // manual reset
  digitalWrite(RFM69_RST, HIGH);
  delay(10);
  digitalWrite(RFM69_RST, LOW);
  delay(10);
  
  if (!rf69.init())
  {
    Serial.println(F("RFM69 KO"));
    while (1);
  }
  Serial.println(F("RFM69 OK"));
  // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM (for low power module)
  // No encryption
  if (!rf69.setFrequency(RF69_FREQ))
  {
    Serial.println(F("setFreq KO"));
  }

  // If you are using a high power RF69 eg RFM69HW, you *must* set a Tx power with the
  // ishighpowermodule flag set like this:
  rf69.setTxPower(20, true);  // range from 14-20 for power, 2nd arg must be true for 69HCW

  // The encryption key has to be the same as the one in the server
  uint8_t key[] = { 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                    0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08};
  rf69.setEncryptionKey(key);
  
  Serial.print(F("RFM69 @"));  Serial.print((int)RF69_FREQ);  Serial.println(F(" MHz"));

// FINE RADIO SETUP

// Altimeter Test

  if (! baro.begin())
  {
    Serial.println("Couldnt find sensor");
  }

  float pascals = baro.getPressure();
  Serial.print(pascals);
  Serial.println(" pascals");
  
  float altm = baro.getAltitude();
  Serial.print(altm); Serial.println(" meters");

  float tempC = baro.getTemperature();
  Serial.print(tempC); Serial.println("*C");

}

int GNGGAMsg = 0;
String GPSMsg = "";
String GPSMsgPart1 = "";
String GPSMsgPart2 = "";

int valueA0 = 0;
float vA0 = 0.0;
float vBatt = 0.0;

void loop()
{
  char radiopacket[80] = "";
  int j = 0;
  Serial.println(GPSMsg);
  Serial.println(GPSMsg.length());
  delay(100);  // era 1000 era 500
// stringa di esempio per estrazione dati GPS
// $GNGGA,144449.000,4506.082438,N,00732.014567,E,1,6,1.89,314.840,M,48.217,M,,*4B//

  while (myI2CGPS.available()) //available() returns the number of new bytes available from the GPS module
  {
    byte incoming = myI2CGPS.read(); //Read the latest byte from Qwiic GPS

    if(incoming == '$') //indica l'inizio di un GPSMsg
    {
      Serial.println(); //Break the sentences onto new lines
      GPSMsg = '$';  // inizio un nuovo GPSMsg 
      GNGGAMsg = 1;
      ////Serial.print("GNGGAMsg: ");
      Serial.println(GNGGAMsg);
    }
    else
    {
      if((incoming == 'G') && (GNGGAMsg == 1))
      {
        GPSMsg = GPSMsg + 'G';
        GNGGAMsg = 2;  
        ////Serial.print("GNGGAMsg: ");
        Serial.println(GNGGAMsg);
      }
      else
      {
        if((incoming == 'N') && (GNGGAMsg == 2))
        {
          GPSMsg = GPSMsg + 'N';
          GNGGAMsg = 3;  
          ////Serial.print("GNGGAMsg: ");
          Serial.println(GNGGAMsg);
        }
        else
        {
          if((incoming == 'G') && (GNGGAMsg == 3))
          {
            GPSMsg = GPSMsg + 'G';
            GNGGAMsg = 4; 
            ////Serial.print("GNGGAMsg: ");
            Serial.println(GNGGAMsg); 
          }
          else
          {
            if((incoming == 'G') && (GNGGAMsg == 4))
            {
              GPSMsg = GPSMsg + 'G';
              GNGGAMsg = 5; 
              ////Serial.print("GNGGAMsg: ");
              Serial.println(GNGGAMsg);  
            }
            else
            {
              if((incoming == 'A') && (GNGGAMsg == 5))
              {
                GPSMsg = GPSMsg + 'A';
                GNGGAMsg = 6;  
                ////Serial.print("GNGGAMsg: ");
                Serial.println(GNGGAMsg); 
              }  
              else
              {
                if((incoming == '*'))
                {
                  GPSMsg = GPSMsg + char(incoming);
                  // aggiunta -------
                  incoming = myI2CGPS.read();
                  GPSMsg = GPSMsg + char(incoming);
                  incoming = myI2CGPS.read();
                  GPSMsg = GPSMsg + char(incoming);
                  
                  if(GNGGAMsg == 6)
                  {
                    Serial.println(GPSMsg);
                    Serial.println(GPSMsg.length());


////char radiopacket[80] = "";
////int j = 0;

////Serial.print("Len str to send: ");
                    Serial.println(GPSMsg.length());

                    if(GPSMsg.length() > 50)
                    {
                      for(j=0; j<50; j++)
                      {
                        radiopacket[j] = GPSMsg.charAt(j);  
                      }
////  Serial.print("Lun da inv 1: ");
                      Serial.println(strlen(radiopacket));
//  radiopacket[GPSMsgPart1.length()] = NULL;
                      radiopacket[50] = NULL;
////  Serial.print("Sending "); Serial.print(strlen(radiopacket)); Serial.println(radiopacket);
                      rf69.send((uint8_t *)radiopacket, 50);
                      rf69.waitPacketSent();
/// invio seconda parte
                      for(j=50; j<GPSMsg.length(); j++)
                      {
                        radiopacket[j-50] = GPSMsg.charAt(j);  
                      }
                      radiopacket[GPSMsg.length()-50] = NULL;
  
////  Serial.print("Lun da inv 2: ");
                      Serial.println(strlen(radiopacket));
  
////  Serial.print("Sending "); Serial.print(strlen(radiopacket)); Serial.println(radiopacket);
                      rf69.send((uint8_t *)radiopacket, strlen(radiopacket));
                      rf69.waitPacketSent();
  
                    }
                    else
                    {
                      for(j=0; j<GPSMsg.length(); j++)
                      {
                        radiopacket[j] = GPSMsg.charAt(j);  
                      }

                      radiopacket[j+1] = NULL;
////  Serial.print("Lun da inv: ");
////  Serial.println(strlen(radiopacket));

////  Serial.print("Sending "); Serial.print(strlen(radiopacket)); Serial.println(radiopacket);
                      rf69.send((uint8_t *)radiopacket, 50);
                      rf69.waitPacketSent();
  
                    }
                   
                  }
                  GNGGAMsg = 0;  //il GNGGAMsg è terminato
                }
                else
                {
                  GPSMsg = GPSMsg + char(incoming);
                  ///GNGGAMsg = 8; //im GNGGSMsg prosegue con i dati veri e propri
                }    
              }
            }
          }
        }
      }
    }

///    Serial.write(incoming); //Print this character
  }
  
///  GNGGAMsg = 0;   // azzero il msg inviato
///  GPSMsg = "";

  String EnvImuMsg = "#S";
  long millisecondi = millis();
  long secondiAssol = millisecondi/1000;
  long minutiAssol = secondiAssol/60;
  long secondiEff = secondiAssol - minutiAssol*60;

  EnvImuMsg.concat(minutiAssol);
  EnvImuMsg.concat(":");
  EnvImuMsg.concat(secondiEff);
  Serial.println();
  Serial.println("===");

  EnvImuMsg = EnvImuMsg + String("H");
  Serial.print(F("H: "));
  int hum = 0;
  Serial.print(hum);
  EnvImuMsg = EnvImuMsg + String(hum);
  
  EnvImuMsg = EnvImuMsg + String("P");
  float pascals = baro.getPressure();
  Serial.print(F(" P: "));
  Serial.print(pascals);
  EnvImuMsg = EnvImuMsg + String(pascals);

  EnvImuMsg = EnvImuMsg + String("A");
  Serial.print(F(" A: "));
  float altm = baro.getAltitude();
  
  Serial.print(altm);
  // Serial.print(mySensor.readFloatAltitudeFeet(), 1);
  EnvImuMsg = EnvImuMsg + String(altm);

  EnvImuMsg = EnvImuMsg + String("T");
  Serial.print(F(" T: "));
  float tempC = baro.getTemperature();
  Serial.print(tempC);
  // Serial.print(mySensor.readTempF(), 2);
  EnvImuMsg = EnvImuMsg + String(tempC);
    
  Serial.println();

  //Look for reports from the IMU
  if (myIMU.dataAvailable() == true)
  {
    float quatI = myIMU.getQuatI();
    float quatJ = myIMU.getQuatJ();
    float quatK = myIMU.getQuatK();
    float quatReal = myIMU.getQuatReal();
    float quatRadianAccuracy = myIMU.getQuatRadianAccuracy();

    float x = myIMU.getAccelX();
    float y = myIMU.getAccelY();
    float z = myIMU.getAccelZ();

 // EnvImuMsg = EnvImuMsg + String("Ax"); // PROVARE A USARE CONCAT ===
  EnvImuMsg.concat("Ax");
//  EnvImuMsg = EnvImuMsg + String(myIMU.getAccelX());
  EnvImuMsg.concat(myIMU.getAccelX());

  // EnvImuMsg = EnvImuMsg + String("Ay");
  EnvImuMsg.concat("Ay");
  // EnvImuMsg = EnvImuMsg + String(myIMU.getAccelY());
  EnvImuMsg.concat(myIMU.getAccelY());
 
  // EnvImuMsg = EnvImuMsg + String("Az");
  EnvImuMsg.concat("Az"); 
  // EnvImuMsg = EnvImuMsg + String(myIMU.getAccelZ());
  EnvImuMsg.concat(myIMU.getAccelZ());

  // valore tensione batteria
  EnvImuMsg.concat("B");
  EnvImuMsg.concat(vBatt);

  
  // EnvImuMsg = EnvImuMsg + String("E*");
  EnvImuMsg.concat("E*");
  Serial.println();
    Serial.println(EnvImuMsg);


if(EnvImuMsg.length() > 50)
{
  for(j=0; j<50; j++)
  {
    radiopacket[j] = EnvImuMsg.charAt(j);  
  }
Serial.print(F("Lun da inv 1: "));
  Serial.println(strlen(radiopacket));
  radiopacket[50] = NULL;
////  Serial.println(radiopacket);
  rf69.send((uint8_t *)radiopacket, 50);
  rf69.waitPacketSent();

  for(j=50; j<EnvImuMsg.length(); j++)
  {
    radiopacket[j-50] = EnvImuMsg.charAt(j);  
  }
  radiopacket[EnvImuMsg.length()-50] = NULL;
  
Serial.print(F("Lun da inv 2: "));
  Serial.println(strlen(radiopacket));
////// Serial.println(radiopacket);
  
////  Serial.print("Sending "); Serial.print(strlen(radiopacket)); Serial.println(radiopacket);
  rf69.send((uint8_t *)radiopacket, strlen(radiopacket));
  rf69.waitPacketSent();
  
}
else
{
  for(j=0; j<EnvImuMsg.length(); j++)
  {
    radiopacket[j] = EnvImuMsg.charAt(j);  
  }

  radiopacket[j+1] = NULL;
Serial.print(F("Lun da inv: "));
Serial.println(strlen(radiopacket));

////  Serial.print("Sending "); Serial.print(strlen(radiopacket)); Serial.println(radiopacket);
  rf69.send((uint8_t *)radiopacket, strlen(radiopacket)); // era 50
  rf69.waitPacketSent();
  
}
// TEST BATTERIA 
    valueA0 = analogRead(A0);
    vA0 = (valueA0 * 5.0)/1023.0;
    vBatt = 12682 * vA0/2742;
    // Serial.print(" ---------- TEst Batteria: ");
    // Serial.print(valueA0);
    // Serial.print("  ");
    // Serial.print(vA0);
    // Serial.print("  ");
    // Serial.print(vBatt);
    // Serial.println("V");   // qui occorre inserire il blocco dei dc-dc se la batteria è troppo scarica
/*    
    Serial.print(x, 2);
    Serial.print(F(","));
    Serial.print(y, 2);
    Serial.print(F(","));
    Serial.print(z, 2);
    Serial.print(F(","));
        
    Serial.print(quatI, 2);
    Serial.print(F(","));
    Serial.print(quatJ, 2);
    Serial.print(F(","));
    Serial.print(quatK, 2);
    Serial.print(F(","));
    Serial.print(quatReal, 2);
    Serial.print(F(","));
    Serial.print(quatRadianAccuracy, 2);
    Serial.print(F(","));
*/

    
    Serial.println("--------------------");

  GNGGAMsg = 0;   // azzero il msg inviato
  GPSMsg = "";
  EnvImuMsg = "";
  
/* EVITO LA RISPOSTA
 *  
  // Now wait for a reply
  uint8_t buf[RH_RF69_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);

  if (rf69.waitAvailableTimeout(500)) 
  { 
    // Should be a reply message for us now   
    if (rf69.recv(buf, &len))
    {
      Serial.print("Got a reply: ");
      Serial.println((char*)buf);
      
    }
    else
    {
      Serial.println("Receive failed");
    }
  }
  else
  {
    Serial.println("No reply, is another RFM69 listening?");
  }
*/

// TERMINE INVIO RADIO

    delay(100);   // era 500 era 200

    // con il delay in cima, in questo modo, viene inviata una
    // coppia di stringhe dei due tipi al secondo

 }
  
}
