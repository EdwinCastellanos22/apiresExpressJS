from PyQt5.QtWidgets import QWidget, QLabel, QVBoxLayout, QLineEdit, QPushButton, QMessageBox, QApplication
from PyQt5.QtGui import QFont
from PyQt5.QtCore import Qt
import json
import requests
import time

from settings.localStorage import localStorage


class Login(QWidget):
    def __init__(self, stacked):
        super().__init__()
        self.stacked = stacked
                
        # ---- SETTINGS WINDOW ------
        self.setWindowTitle("Login")
        # ----- TITULO -------
        title = QLabel("-- Iniciar Sesión --")
        title.setFont(QFont('Arial', 18, QFont.Bold)) 
        title.setAlignment(Qt.AlignCenter)            
        
        #----- USERNAME -----
        self.username = QLineEdit()
        self.username.setPlaceholderText("Email")
        self.username.setFixedHeight(45)
        
        #----- PASSWORD -----
        self.passwd = QLineEdit()
        self.passwd.setPlaceholderText("Password")
        self.passwd.setEchoMode(QLineEdit.Password)
        self.passwd.setFixedHeight(45)
        
        #----- BTN LOGIN -----
        self.btn_login = QPushButton("Entar")
        self.btn_login.clicked.connect(self.checkLogin)
        self.btn_login.setFixedHeight(40)
        
        # ----- LAYOUT ------
        layout = QVBoxLayout()
        layout.addWidget(title)
        layout.addWidget(self.username)
        layout.addWidget(self.passwd)
        layout.addWidget(self.btn_login)
        self.setLayout(layout)
        
        #----- STYLES CSS -----
        self.setStyleSheet("""
           QWidget {
               background-color: #2c3e50;
               color: #ecf0f1;
           }
           QLineEdit {
               border: 2px solid #3498db;
               border-radius: 8px;
               padding: 5px;
               margin: 5px;
               font-size: 14px;
               background: #34495e;
               color: #ecf0f1;
           }
           QLineEdit:focus {
               border: 2px solid #1abc9c;
           }
           QPushButton {
               background-color: #3498db;
               border-radius: 10px;
               font-weight: bold;
               color: white;
           }
           QPushButton:hover {
               background-color: #2980b9;
           }
        """)
        
    def checkLogin(self):
        self.btn_login.setText("Entrando...")
        QApplication.processEvents()
        
        user = self.username.text()
        passwd = self.passwd.text()
        
        if user == '' or passwd == '':
            QMessageBox.warning(self, "Error", "Ingrese las crendenciales!")
        else:
            try:
                #url
            ######################################################
                self.url = 'https://apiresexpressjs.onrender.com'
                self.pathLogin= '/api/login'
                self.headers = {
                "Accept": "*/*",
                "Content-Type": "application/json" 
                }
                self.payload= json.dumps({
                "email": user,
                "password": passwd
                })
                
                res= requests.request("POST", url=f"{self.url}{self.pathLogin}", data=self.payload, headers=self.headers)
                if res.status_code == 200:
                    data = res.json()
                    localStorage.setItem('token', data['token'])
                    QMessageBox.information(self, "Exito", data['message'])
                    print("Login")
                    self.stacked.setCurrentIndex(0)
                else:
                    t= res.json()
                    QMessageBox.warning(self, "Error", t['error'])
            except Exception as e:
                QMessageBox.critical(self, "Error", "Error al conectar con el servidor!")
            ########################################################
        self.btn_login.setText("Entrar")
