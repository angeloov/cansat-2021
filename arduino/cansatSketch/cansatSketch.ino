#include <Arduino_HTS221.h>
#include <Arduino_LPS22HB.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BMP3XX.h"

#define BMP_SCK 13
#define BMP_MISO 12
#define BMP_MOSI 11
#define BMP_CS 10

#define SEALEVELPRESSURE_HPA (1013.25)

Adafruit_BMP3XX bmp;
#include "SparkFun_u-blox_GNSS_Arduino_Library.h"
SFE_UBLOX_GNSS myGNSS;

void setup() {
  Serial.begin(115200);
  while (!Serial);
  Serial.println("Altitude Sensor On");

  if (!bmp.begin_I2C()) { 
    Serial.println("Could not find a valid BMP3 sensor, check wiring!");
    while (1);
  }
  Serial.begin(9600);
  while (!Serial);

  if (!HTS.begin()) {
    Serial.println("Failed to initialize humidity temperature sensor!");
    while (1);
  }
  Serial.begin(9600);
  while (!Serial);

  if (!BARO.begin()) {
    Serial.println("Failed to initialize pressure sensor!");
    while (1);
  }
  Serial.begin(115200);

  Wire.begin();

  if (myGNSS.begin() == false)
  {
    Serial.println(F("u-blox GNSS module not detected at default I2C address. Please check wiring. Freezing."));
    while (1);
  }
  myGNSS.setNMEAOutputPort(Serial);
}

void loop() {
  if (! bmp.performReading()) {
    Serial.println("Failed to perform reading :(");
    return;
  }

  float temperature = HTS.readTemperature();
  float humidity = HTS.readHumidity();
  float pressure = BARO.readPressure();
  float altitude = bmp.readAltitude(SEALEVELPRESSURE_HPA);

  String stringToSendToTheServer = buildStringToSend(temperature, humidity, pressure, altitude);
  
  Serial.println(stringToSendToTheServer);

  myGNSS.checkUblox();
  delay(100);
}

// string example -> T29.0P172A84U12
String buildStringToSend(float temperature, float humidity, float pressure, float altitude) {
  return (
    "T" + String(temperature) + "P" String(pressure) + "A" + String(altitude) + "U" + String(humidity)
  );
}