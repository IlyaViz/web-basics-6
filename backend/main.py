from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Tab(BaseModel):
    name: str
    content: str

class Tabs(BaseModel):
    tabs: list[Tab]  

FILE_NAME = "tabs.txt"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/save-tabs")
def save_tabs(tabs: Tabs):
    with open(FILE_NAME, 'w') as file:
        for tab in tabs.tabs:
            file.write(f"{tab.name} {tab.content}\n")

    return "Success"

@app.get("/get-tabs")
def get_tabs():
    tabs = []
    
    with open(FILE_NAME, 'r') as file:
        while line := file.readline():
            name, content = line.strip().split()
            
            tabs.append({"name":name, "content":content})
    
    return tabs