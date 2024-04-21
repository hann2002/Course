from sqlalchemy.orm import Session, load_only
from sqlalchemy.sql.expression import func, select
from app.schemas import Scores
from app.request_body import Score
import random
import json

def save_user_score(db: Session, score: Score) :
    userscore = db.query(Scores).filter_by(name=score.name).all()
    if not userscore : 
        db_userscore = Scores(
            name = score.name,
            total_stars = score.total_stars,
            submit_time = score.submit_time,
            highest_score = score.highest_score
        )
        db.add(db_userscore)
        db.commit()
        db.refresh(db_userscore)
        return db_userscore
    update_score = {Scores.total_stars: score.total_stars, Scores.submit_time: score.submit_time, Scores.highest_score: score.highest_score}
    db.query(Scores).filter_by(name=score.name).update(update_score)
    db.commit()
    return db.query(Scores).filter_by(name=score.name).one()

def get_score(db: Session, name: str) :
    userscore = db.query(Scores).filter_by(name=name).all()
    if not userscore :
        return_value = {
            "total_stars":"",
            "submit_time":"",
            "highest_score":"",
        }
        return (return_value)
    
    return db.query(Scores).filter_by(name=name).one()