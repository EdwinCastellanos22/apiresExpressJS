import sys, os
from PyQt5.QtWidgets import QApplication, QWidget, QLabel, QVBoxLayout, QPushButton, QStackedWidget
from PyQt5.QtGui import QFont
from PyQt5.QtCore import Qt
import jwt

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from settings.localStorage import localStorage

#Ventanas
from login import Login



class MainPage(QWidget):
    def __init__(self, stacked):
        super().__init__()
        self.stacked = stacked
        
        #TITLE
        title= QLabel("Bienvenidp Blog Chaing")
        title.setFont(QFont("Arial", 18))
        title.setAlignment(Qt.AlignCenter)
        
        #JWT
        if localStorage.getItem('token'):
            token= localStorage.getItem('token')
            tokenjwt= QLabel(str(token))
            
        
        #Button login
        btnLogin = QPushButton("Login")
        btnLogin.clicked.connect(self.login)
        
        #btnlogout
        btnLogout = QPushButton("Logout")
        btnLogout.clicked.connect(self.logout)
        
        
        #layout
        mainLayout= QVBoxLayout()
        mainLayout.addWidget(title)
        if localStorage.getItem('token'):
            mainLayout.addWidget(tokenjwt)
            mainLayout.addWidget(btnLogout)
            self.update()
        else:
            mainLayout.addWidget(btnLogin)
        self.setLayout(mainLayout)
        
        
    def login(self):
        self.stacked.setCurrentIndex(1)
        
    def logout(self):
        print("Logout!!")
        localStorage.clear()
        self.update()
        

if __name__ == "__main__":
    app = QApplication(sys.argv)
    
    stacked = QStackedWidget()
    login_page= Login(stacked)
    main_page= MainPage(stacked)
    
    stacked.addWidget(main_page)
    stacked.addWidget(login_page)
    
    stacked.setFixedSize(500, 300)
    stacked.show()
    sys.exit(app.exec_())