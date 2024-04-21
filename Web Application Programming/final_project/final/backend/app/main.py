
from app.log_email import Send
from datetime import date, datetime, timedelta
import bcrypt
from fastapi import FastAPI, Request, HTTPException, BackgroundTasks, status, UploadFile, File, Depends
from sqlalchemy.orm import sessionmaker

# import engine from other file
from app.schemas import engine, User, Donator
from fastapi.responses import JSONResponse
from app.request_body import donate_body, register_body, login_body
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jose import jwt
from fastapi.middleware.cors import CORSMiddleware
from typing import Any


# create session
Session = sessionmaker(bind=engine)

# perform database operations using session
app = FastAPI(debug=True)
# 設置跨域中間件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can specify allowed origins, e.g. ["http://localhost:8000"]
    allow_credentials=True,
    allow_methods=["*"],  # You can specify allowed methods, e.g. ["GET", "POST"]
    allow_headers=["*"],  # You can specify allowed headers, e.g. ["Content-Type"]
)


import json
@app.post("/donate")
async def log_email(donate_information: donate_body):
    print(donate_information)
    Money = 0
    if donate_information.money_index == 0:
        Money = 200
    elif donate_information.money_index == 1:
        Money = 500
    else:
        Money = 1000
    # 輸入資料庫
    donate_log = Donator(email = donate_information.email,
                         donated_at = datetime.now(),
                         money = Money)
    with Session() as session:
        session.add(donate_log)
        session.commit()

    # 寄送確認信
    Send(sub = '感謝{}您的捐款'.format(donate_information.surname + donate_information.given_name),
         email = donate_information.email, 
         MIME = MIMEText("已受到您每月{}元的捐款".format(Money)))

    

@app.post("/register")
async def register(register_information:register_body):
    
    email = register_information.email
    password_first = register_information.password
    password_second = register_information.password_again
    name = register_information.name
    number = register_information.num
        

    # 判別是否正確
    if password_first != password_second:
        raise HTTPException(status_code = 500, detail = "Password is not consistent.")

    hashed_password = bcrypt.hashpw(password_first.encode('utf-8'), bcrypt.gensalt())

    with Session() as session:
        # 帳號是否出現過
        if session.query(User).filter(User.email == email).first() is  not None:
            raise HTTPException(status_code = 500, detail = "Account has existed.")

        # 資料庫新增此使用者
        else:
            new_user = User(email = email,
                            password = hashed_password,
                            name = name,
                            number = number, 
                            active = False)
            session.add(new_user)
            session.commit()



# 激活帳號
@app.get("/activate/{token}")
async def activate_account(token: str):
    SECRET_KEY = "your-secret-key"
    ALGORITHM = "HS256"

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
    except jwt.JWTError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token")
    print(user_id)

    with Session() as session:
        user = session.query(User).filter(User.email == user_id).first()
        
        if not user:
            raise HTTPException(status_code = 500, detail = "No Account")
        user.active = True
        session.query(User).filter(User.email == user.email).update({"active" : True})
        session.commit()

    return {"msg": "Your account has been successfully activated."}


# 登入帳號
@app.post("/login")
async def register(login_information:login_body):
    
    email = login_information.email
    password = login_information.password.encode('utf-8')

    with Session() as session:
        # 帳號是否出現過
        user = session.query(User).filter(User.email == email).first()
        if user is  None:
            raise HTTPException(status_code = 500, detail = "Account has not been registered.")
        else:
            if bcrypt.checkpw(password, user.password):
                return {'Account': user.name}
            else:
                raise HTTPException(status_code = 500, detail = "Password is wrong!")

# 當前使用者資訊
@app.get("/user/{user_name}")
async def user_info(user_name: str):
    with Session() as session:
        user = session.query(User).filter(User.name == user_name).first()
        if user is  None:
            raise HTTPException(status_code = 500, detail = "Account has not been registered.")
        else:
            return {'Account': user.name,
                    'Email': user.email,
                    'Number': user.number}

# 請求傳入檔案
@app.post("/uploadcsv/")
async def create_upload_file(file: UploadFile=File(...)):
    try:
       df = pd.read_csv(file.file)
       print(df)
       return {"filename": file.filename}
    except Exception as e:
       return JSONResponse(status_code=404, content={"message": str(e)})
    



from app.schemas import Comments1, Comments2, Comments3, Comments4, Comments5, Comments6
from app.request_body import Comment

db = Session()

@app.post("/comments1")#, status_code=status.HTTP_201_CREATED)
async def create_comment(comment_schema: Comment):#,db: Session = Depends(Session)):
    row_num = db.query(Comments1).count()
    db_comments = Comments1(
        id = row_num,
        name = comment_schema.name,
        comment = comment_schema.comment
    )
    db.add(db_comments)
    db.commit()
    db.refresh(db_comments)
    return db_comments

@app.post("/comments2", status_code=status.HTTP_201_CREATED)
async def create_comment(comment_schema: Comment):#,db: Session = Depends(Session)):
    row_num = db.query(Comments2).count()
    db_comments = Comments2(
        id = row_num,
        name = comment_schema.name,
        comment = comment_schema.comment
    )
    db.add(db_comments)
    db.commit()
    db.refresh(db_comments)
    return db_comments

@app.post("/comments3", status_code=status.HTTP_201_CREATED)
async def create_comment(comment_schema: Comment):#,db: Session = Depends(Session)):
    row_num = db.query(Comments3).count()
    db_comments = Comments3(
        id = row_num,
        name = comment_schema.name,
        comment = comment_schema.comment
    )
    db.add(db_comments)
    db.commit()
    db.refresh(db_comments)
    return db_comments

@app.post("/comments4", status_code=status.HTTP_201_CREATED)
async def create_comment(comment_schema: Comment):#,db: Session = Depends(Session)):
    row_num = db.query(Comments4).count()
    db_comments = Comments4(
        id = row_num,
        name = comment_schema.name,
        comment = comment_schema.comment
    )
    db.add(db_comments)
    db.commit()
    db.refresh(db_comments)
    return db_comments

@app.post("/comments5", status_code=status.HTTP_201_CREATED)
async def create_comment(comment_schema: Comment):#,db: Session = Depends(Session)):
    row_num = db.query(Comments5).count()
    db_comments = Comments5(
        id = row_num,
        name = comment_schema.name,
        comment = comment_schema.comment
    )
    db.add(db_comments)
    db.commit()
    db.refresh(db_comments)
    return db_comments

@app.post("/comments6", status_code=status.HTTP_201_CREATED)
async def create_comment(comment_schema: Comment,db):#,db: Session = Depends(Session)):
    row_num = db.query(Comments6).count()
    db_comments = Comments6(
        id = row_num,
        name = comment_schema.name,
        comment = comment_schema.comment
    )
    db.add(db_comments)
    db.commit()
    db.refresh(db_comments)
    return db_comments

@app.get("/comments1")
async def get_comments():#(db: Session = Depends(Session)):
    comments = db.query(Comments1).all()
    return comments

@app.get("/comments2")
async def get_comments():#(db: Session = Depends(Session)):
    comments = db.query(Comments2).all()
    return comments

@app.get("/comments3")
async def get_comments():#(db: Session = Depends(Session)):
    comments = db.query(Comments3).all()
    return comments

@app.get("/comments4")
async def get_comments():#(db: Session = Depends(Session)):
    comments = db.query(Comments4).all()
    return comments

@app.get("/comments5")
async def get_comments():#(db: Session = Depends(Session)):
    comments = db.query(Comments5).all()
    return comments

@app.get("/comments6")
async def get_comments():#(db: Session = Depends(Session)):
    comments = db.query(Comments6).all()
    return comments

from app.question_crud import (
    question_create,
    quetions_get_all,
    question_delete,
    question_get_random,
)
from app.request_body import Question

@app.post("/create")#, status_code=status.HTTP_201_CREATED, response_model=Question)
async def create_question(question: Question):# , db: Session = Depends()):
    return question_create(db=db, question=question)

@app.get("/list/all")#, status_code=status.HTTP_200_OK, response_model=List[Question])
async def get_all_questions():#(db: Session = Depends(get_db)) :
    return quetions_get_all(db=db)

@app.delete("/delete/{id}")#, status_code=status.HTTP_200_OK)
async def delete_question(id):#:, db: Session = Depends(get_db)) :
    return question_delete(id=id, db=db)

@app.get("/list/random")#, status_code=status.HTTP_200_OK, response_model=List[Question])
async def get_random_questions():#(db: Session = Depends(get_db)) :
    return question_get_random(db=db)


from app.request_body import Schemas_User, Id_num, Diff
from app.race_crud import create, get_rank, get_sum, get_three
from typing import List

active_id = ["0"]
# 輸入
@app.post("/users", response_model=Schemas_User)#, tags=["active_id"])
async def main_create(user: Schemas_User):#, db: Session = Depends(get_db)):
    re = create(db=db, user=user)
    if not (re.id == ""):
        active_id.append(user.id)
    return re
    # active_id.append(user.id)
    # return create(db=db, user=user)

# 回傳排名、差距
@app.get("/users/getrank/{user_id}", response_model=Diff)
# def get_rank(user_id:int, db: Session = Depends(get_db)):
async def main_get_rank(user_id):#db: Session = Depends(get_db)):
    return get_rank(db=db, user_id=user_id)
    # return crud.get_rank(db, user_id=user_id)
@app.get("/users/three", response_model=List[Id_num])
# 回傳前三名：名字、數量
async def main_get_three():#:db: Session = Depends(get_db)):
    return get_three(db=db)

# 回傳sum
@app.get("/users/sum", response_model=Schemas_User)
async def main_get_sum():#db: Session = Depends(get_db)):
    return get_sum(db=db)


from app.schemas import Scores
from app.request_body import Score
from app.scores_crud import get_score, save_user_score
@app.post("/upload")
async def upload_score(score: Score):#:, db: Session = Depends(get_db)):
    return save_user_score(db=db, score=score)

@app.get("getscore/{name}")
async def get_user_score(name: str):#:, db: Session = Depends(get_db)):
    return get_score(db=db, name=name)


