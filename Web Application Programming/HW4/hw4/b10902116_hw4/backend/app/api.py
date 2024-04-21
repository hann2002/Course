from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
origins = [
    "http://localhost:3000",
    "localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
now = [{"id": 0,"plastic": 0,"meat": 0,"dish": 0,"trans": 0}]
users = [
    {
        "id": 0,"plastic": 0,"meat": 0,"dish": 0,"trans": 0
    },
    {
        "id": 1,"plastic": 1,"meat": 1,"dish": 1,"trans": 1
    },
    {
        "id": 2,"plastic": 2,"meat": 2,"dish": 2,"trans": 2
    }
]

@app.get("/data", tags=["now", "users"])
async def get_users() -> dict:
    result = {}
    num = []
    for item in users:
        num.append([item["dish"], item["id"]])
    num.sort(reverse=True)
    result["dish"] = list(num[0:3])
    for i in range(3-len(num)):
        result["dish"].append(["", "(empty)"])
    big = [0, 1]
    for i, item in enumerate(num):
        if item[0] > now[-1]["dish"]:
            big =  [item[0] - now[-1]["dish"], i+2]
        else:
            break
    result["dish"].append(big)
    
    num.clear()
    for item in users:
        num.append([item["plastic"], item["id"]])
    num.sort(reverse=True)
    result["plastic"] = list(num[0:3])
    for i in range(3-len(num)):
        result["plastic"].append(["", "(empty)"])
    big = [0, 1]
    for i, item in enumerate(num):
        if item[0] > now[-1]["plastic"]:
            big =  [item[0] - now[-1]["plastic"], i+2]
        else:
            break
    result["plastic"].append(big)
    
    num.clear()
    for item in users:
        num.append([item["trans"], item["id"]])
    num.sort(reverse=True)
    result["trans"] = list(num[0:3])
    for i in range(3-len(num)):
        result["trans"].append(["", "(empty)"])
    big = [0, 1]
    for i, item in enumerate(num):
        if item[0] > now[-1]["trans"]:
            big =  [item[0] - now[-1]["trans"], i+2]
        else:
            break
    result["trans"].append(big)
    
    num.clear()
    for item in users:
        num.append([item["meat"], item["id"]])
    num.sort(reverse=True)
    result["meat"] = list(num[0:3])
    for i in range(3-len(num)):
        result["meat"].append(["", "(empty)"])
    big = [0, 1]
    for i, item in enumerate(num):
        if item[0] > now[-1]["meat"]:
            big =  [item[0] - now[-1]["meat"], i+2]
        else:
            break
    result["meat"].append(big)
    
    sum = {"plastic": 0,"meat": 0,"dish": 0,"trans": 0}
    for item in users:
        sum["plastic"] += item["plastic"]
        sum["trans"] += item["trans"]
        sum["dish"] += item["dish"]
        sum["meat"] += item["meat"]
    result["plastic"].append(sum["plastic"])
    result["trans"].append(sum["trans"])
    result["dish"].append(sum["dish"])
    result["meat"].append(sum["meat"])
    return result

@app.post("/data", tags=["now", "users"])
async def add_user(user: dict) -> dict:
    for item in users:
        if item.get("id") == user["id"]:
            item["plastic"] += user["plastic"]
            item["meat"] += user["meat"]
            item["dish"] += user["dish"]
            item["trans"] += user["trans"]
            now.append(item)
            return {"data": { "User added." }}
    users.append(user)
    now.append(user)
    return {
        "data": { "User added." }
    }