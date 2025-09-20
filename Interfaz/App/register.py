from PyQt5.QtWidgets import QWidget, QLabel, QVBoxLayout, QLineEdit, QPushButton, QMessageBox
from PyQt5.QtGui import QFont
from PyQt5.QtCore import Qt


class Register(QWidget):
    def __init__(self):
        super().__init__()
        
        # ---- SETTINGS WINDOW ------
        self.setWindowTitle("Register")
        
        # ----- TITULO -------
        title = QLabel("-- Registrarme --")
        title.setFont(QFont('Arial', 18, QFont.Bold)) 
        title.setAlignment(Qt.AlignCenter)            
        
        #----- USERNAME -----
        self.username = QLineEdit()
        self.username.setPlaceholderText("Username")
        self.username.setFixedHeight(45)
        
        #----- PASSWORD -----
        self.email = QLineEdit()
        self.email.setPlaceholderText("Email")
        self.email.setEchoMode(QLineEdit.Email)
        self.email.setFixedHeight(45)
        
        #----- PASSWORD -----
        self.passwd = QLineEdit()
        self.passwd.setPlaceholderText("Password")
        self.passwd.setEchoMode(QLineEdit.Password)
        self.passwd.setFixedHeight(45)
        
        #----- PASSWORD2 -----
        self.passwd2 = QLineEdit()
        self.passwd2.setPlaceholderText("Password Repeat")
        self.passwd2.setEchoMode(QLineEdit.Password)
        self.passwd2.setFixedHeight(45)
        
        #----- BTN LOGIN -----
        btn_login = QPushButton("Login")
        btn_login.clicked.connect(self.checkLogin)
        btn_login.setFixedHeight(40)
        
        # ----- LAYOUT ------
        layout = QVBoxLayout()
        layout.addWidget(title)
        layout.addWidget(self.username)
        layout.addWidget(self.email)
        layout.addWidget(self.passwd)
        layout.addWidget(self.passwd2)
        layout.addWidget(btn_login)
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
        user = self.username.text()
        passwd = self.passwd.text()
        
        if user == '' or passwd == '':
            QMessageBox.warning(self, "Error", "Ingrese las crendenciales!")
        else:
            if user == 'admin' and passwd == '12345':
                QMessageBox.information(self, "Login Exitoso", "Bienvenido 🎉")
            else:
                QMessageBox.warning(self, "Credenciales Incorrectas", "Usuario o contraseña inválidos.")
    
