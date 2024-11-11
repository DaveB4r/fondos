from smtplib import SMTP_SSL

def sendEmail(msg: str, address: str):
    with SMTP_SSL(host='smtp.gmail.com', port=465) as smtp:
        smtp.login('davidpinedaaaa@gmail.com', 'apbk myma aswg wpkx')
        smtp.sendmail(from_addr='davidpinedaaaa@gmail.com', to_addrs=[address], msg=msg)
        smtp.quit()
        print('Email sent')
