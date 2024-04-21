
from app.schemas import Race_User, User
from app.request_body import Schemas_User, Diff, Id_num

from sqlalchemy import func, desc
from sqlalchemy.orm import Session

def create(db: Session, user: Schemas_User):
    # pre = db.query(User).filter(User.name == user.id).first()
    # # if pre is None:
    # #     return Race_User(id="", plastic=user.plastic, meat=user.meat, dish=user.dish, trans=user.trans)
    # if pre is None:
    #     ret = Race_User(id=user.id, plastic=user.plastic, meat=user.meat, dish=user.dish, trans=user.trans)
    #     db.add(ret)
    #     db.commit()
    #     db.refresh(ret)
    # else:
    ret = db.query(Race_User).filter(Race_User.id == user.id).first()
    if ret is None:
        ret = Race_User(id=user.id, plastic=user.plastic, meat=user.meat, dish=user.dish, trans=user.trans)            
        db.add(ret)
        db.commit()
        db.refresh(ret)
        return ret
    else:
        ret.plastic += user.plastic
        ret.meat += user.meat
        ret.dish += user.dish
        ret.trans += user.trans
        db.commit()
    return ret

def get_rank(db: Session, user_id: str):
    # 排好、回傳差距
    ans = Diff(plastic_rank=0,plastic_num=0,meat_rank=0,meat_num=0,dish_rank=0,dish_num=0,trans_rank=0,trans_num=0)
    subquery = db.query(Race_User.id, Race_User.plastic, func.rank().over(order_by=desc(Race_User.plastic)).label('rank')).subquery()
    query = db.query(subquery.c.rank, subquery.c.plastic).filter(subquery.c.id == user_id)
    user = query.first()
    if user is None:
        return ans
    now_rank = user.rank-1
    if user.rank == 1:
        ans.plastic_num = 0
        ans.plastic_rank = 1
    else:
        ans.plastic_rank = now_rank+1
        while db.query(subquery.c.rank, subquery.c.plastic).filter(subquery.c.rank==now_rank).first() is None:
            now_rank = now_rank - 1
        ans.plastic_num = db.query(subquery.c.rank, subquery.c.plastic).filter(subquery.c.rank==now_rank).first().plastic - user.plastic
    
    subquery = db.query(Race_User.id, Race_User.meat, func.rank().over(order_by=desc(Race_User.meat)).label('rank')).subquery()
    query = db.query(subquery.c.rank, subquery.c.meat).filter(subquery.c.id == user_id)
    user = query.first()
    now_rank = user.rank-1
    if user.rank == 1:
        ans.meat_num = 0
        ans.meat_rank = 1
    else:
        ans.meat_rank = now_rank+1
        while db.query(subquery.c.rank, subquery.c.meat).filter(subquery.c.rank==now_rank).first() is None:
            now_rank = now_rank - 1
        ans.meat_num = db.query(subquery.c.rank, subquery.c.meat).filter(subquery.c.rank==now_rank).first().meat - user.meat
    
    subquery = db.query(Race_User.id, Race_User.dish, func.rank().over(order_by=desc(Race_User.dish)).label('rank')).subquery()
    query = db.query(subquery.c.rank, subquery.c.dish).filter(subquery.c.id == user_id)
    user = query.first()
    now_rank = user.rank-1
    if user.rank == 1:
        ans.dish_num = 0
        ans.dish_rank = 1
    else:
        ans.dish_rank = now_rank+1
        while db.query(subquery.c.rank, subquery.c.dish).filter(subquery.c.rank==now_rank).first() is None:
            now_rank = now_rank - 1
        ans.dish_num = db.query(subquery.c.rank, subquery.c.dish).filter(subquery.c.rank==now_rank).first().dish - user.dish
        
    subquery = db.query(Race_User.id, Race_User.trans, func.rank().over(order_by=desc(Race_User.trans)).label('rank')).subquery()
    query = db.query(subquery.c.rank, subquery.c.trans).filter(subquery.c.id == user_id)
    user = query.first()
    now_rank = user.rank-1
    if user.rank == 1:
        ans.trans_num = 0
        ans.trans_rank = 1
    else:
        ans.trans_rank = now_rank+1
        while db.query(subquery.c.rank, subquery.c.trans).filter(subquery.c.rank==now_rank).first() is None:
            now_rank = now_rank - 1
        ans.trans_num = db.query(subquery.c.rank, subquery.c.trans).filter(subquery.c.rank==now_rank).first().trans - user.trans
    return ans

def get_three(db: Session):
    # 排好、回傳前三名
    l = []
    empty = {"id":"", "num":0}
    results = db.query(Race_User.id, Race_User.dish).order_by(Race_User.dish.desc()).limit(3).all()
    for id, dish in results:
        l.append({"id":id, "num":dish})
    for i in range(3-len(results)):
        l.append(empty)
        
    results = db.query(Race_User.id, Race_User.plastic).order_by(Race_User.plastic.desc()).limit(3).all()
    for id, plastic in results:
        l.append({"id":id, "num":plastic})
    for i in range(3-len(results)):
        l.append(empty)
    
    results = db.query(Race_User.id, Race_User.meat).order_by(Race_User.meat.desc()).limit(3).all()
    for id, meat in results:
        l.append({"id":id, "num":meat})
    for i in range(3-len(results)):
        l.append(empty)
    
    results = db.query(Race_User.id, Race_User.trans).order_by(Race_User.trans.desc()).limit(3).all()
    for id, trans in results:
        l.append({"id":id, "num":trans})
    for i in range(3-len(results)):
        l.append(empty)
    return l

def get_sum(db: Session):
    # 回傳sum
    ans = Race_User(plastic=0,meat=0,dish=0,trans=0)
    ans.plastic = db.query(func.sum(Race_User.plastic).label('plastic_sum')).one().plastic_sum
    ans.trans = db.query(func.sum(Race_User.trans).label('trans_sum')).one().trans_sum
    ans.meat = db.query(func.sum(Race_User.meat).label('meat_sum')).one().meat_sum
    ans.dish = db.query(func.sum(Race_User.dish).label('dish_sum')).one().dish_sum
    ans.id = ""
    return ans