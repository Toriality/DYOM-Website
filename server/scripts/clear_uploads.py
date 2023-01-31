# Clear folders in the "uploads" folder that are not assigned to any existing entry in the MongoDB database. This is useful to clean up space by removing projects that are non-existent anymore in the website because it was removed by an moderator. When a project is deleted from the database, their files and folders are still inside the server storage.
import os
import shutil

from bson.objectid import ObjectId
from pymongo import MongoClient

client = MongoClient()
db = client.dyomsite
directory = os.path.abspath(os.path.join(os.path.dirname(__file__), "../uploads/"))
users = []
missions = []
removed = []
valid = []

for dir in os.listdir(directory):
    users.append(dir)

for user in users:
    for dir in os.listdir(os.path.join(directory, user, "missions")):
        missions.append(dir)
    for mission in missions:
        if db.missions.count_documents({"_id": ObjectId(mission)}):
            valid.append(mission)
        else:
            path = os.path.join(directory,user,"missions",mission)
            shutil.rmtree(path)
            removed.append(mission)
    missions.clear()
        
print("VALID: ", valid)
print ("REMOVED: ", removed)