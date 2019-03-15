import os
import glob
import time
import datetime

from influxdb import InfluxDBClient


os.system('modprobe w1-gpio')
os.system('modprobe w1-therm')
 
base_dir = '/sys/bus/w1/devices/'
device_folder = glob.glob(base_dir + '28*')[0]
device_file = device_folder + '/w1_slave'
 
client = None

def read_temp_raw():
    f = open(device_file, 'r')
    lines = f.readlines()
    f.close()
    
    return lines
 
def read_temp():
    lines = read_temp_raw()
    

    equals_pos = lines[1].find('t=')
    
    if equals_pos != -1:
        temp_string = lines[1][equals_pos+2:]
        temp = float(temp_string) / 1000.0
        
        return temp
	

    

def getJson(temp, timestamp):

    json = [
        {
            "measurement" : "measuredTemp",
            "tags": {
                "sensorType": "DS18B20"
            },
            "time": timestamp,
            "fields": {
                "temperature" : temp
            }
        }
    ]
    return json

def main():

    client = InfluxDBClient(host = "localhost", port=8086)
    
    client.switch_database('temperature')

    while True:

        temp = read_temp()
        timestamp = datetime.datetime.utcnow().isoformat()

        client.write_points(getJson(temp, timestamp))
        #print(timestamp, temp)	
        time.sleep(1)

main()


    
