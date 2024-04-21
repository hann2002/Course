from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import smtplib



def Send(sub, email, MIME):
    msg = MIMEMultipart()
    msg['From'] = 'marcus.tsai@shopee.com'
    msg['Subject'] = sub
    msg['To'] = email
    msg.attach(MIME)
    with smtplib.SMTP(host="smtp.gmail.com", port="587") as smtp:  # 設定SMTP伺服器
        try:
            smtp.ehlo()  # 驗證SMTP伺服器
            smtp.starttls()  # 建立加密傳輸
            smtp.login("marcus.tsai@shopee.com", "ztatwqhehpezldth")  # 登入寄件者gmail
            smtp.send_message(msg)  # 寄送郵件
            print("Complete!")
        except Exception as e:
            print("Error message: ", e)

