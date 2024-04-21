
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.schemas.user_wallet import Base
engine = create_engine(
    'sqlite:///test.db',
    pool_pre_ping=True, 
    pool_recycle=300,
    echo=True
)
Base.metadata.create_all(engine)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)