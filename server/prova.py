import re

line = "P123.3T234.62H234.234"
basevalues = re.match("P(\d+\.?\d*)T(\d+\.?\d*)H(\d+\.?\d*)", str(line))
print(basevalues[0])