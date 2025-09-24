import pandas as pd
""" Group disasters into there groups"""

reader = pd.read_csv('dataset/climate_data.csv')
disaster_types = ["Storm", "Flood", "Earthquake"]
for disaster in disaster_types:
	writer = reader[reader['Disaster Type']==disaster]
	writer.to_csv('{}.csv'.format(disaster), index=False)
