            var config = {
                apiKey: "AIzaSyDiUtEy_lE6ca60fZFFmbYKIOQpCfTQY2U",
                authDomain: "personaldiary-18a49.firebaseapp.com",
                databaseURL: "https://personaldiary-18a49.firebaseio.com",
                projectId: "personaldiary-18a49",
                storageBucket: "personaldiary-18a49.appspot.com",
                messagingSenderId: "725095482425"
            };
            firebase.initializeApp(config);

var rootRef = firebase.database().ref();
            var userRef = null;

            /*
            firebase.auth().onAuthStateChanged(function(user) {
                if(user) {
                    View.openPage(View.listPage);

                } else {        
                    View.openPage(View.loginPage);
                }
            });
            */
            
            function login() {
                var account = document.getElementById("account").value;
                var password = document.getElementById("password").value;

                firebase.auth().signInWithEmailAndPassword(account, password).catch(function(error) {
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    window.alert("Error: " + errorMessage);
                    return;
                })
                var user = firebase.auth().currentUser;
                
                if(user != null) {
                    
                }
            }

            function debug(txt) {
                console.log(txt);
            }
            
            function setToday() {
                var date = new Date();
                var today = date.toISOString().slice(0, 10);
                View.inputDate.value = today;
            }
            
            function responseNav() {
                var x = document.getElementById("myTopnav");
                if (x.className === "topnav") {
                    x.className += " responsive";
                } else {
                    x.className = "topnav";
                }
            }
        
            
            const CreatingAccountView = {
                account: document.getElementById("creatingAccount"),
                password: document.getElementById("creatingPassword"),
                comPassword: document.getElementById("comfirmPassword"),
                btnCreate: document.getElementById("createBtn")
            }
            
            const View = {
                loginPage: document.getElementById("login"),
                listPage: document.getElementById("list"),
                entryPage: document.getElementById("entry"),
                homeBtn: document.getElementById("home"),
                diaryListBtn: document.getElementById("diaryList"),
                inputTitle: document.getElementById("inputTitle"),
                inputDate: document.getElementById("inputDate"),
                inputEntry: document.getElementById("inputEntry"),
                creatingPage: document.getElementById("creatingAccountSession"),
                addBtn: document.getElementById("+"),
                cancelBtn: document.getElementById("cancelBtn"),
                
                LoginPage: {
                    txtAccount: document.getElementById("account"),
                    txtPassword: document.getElementById("password"),
                    error: document.getElementById("errorMessage"),
                    btnLogin: document.getElementById("loginBtn"),
                    btnCreateNewAccount: document.getElementById("createNewAccountBtn")
                },
                
                EntryPage: {
                    txtTitle: document.getElementById("inputTitle"),
                    txtDate: document.getElementById("inputDate"),
                    txtContent: document.getElementById("inputEntry"),
                    btnCreate: document.getElementById("createDiary"),
                    error: document.getElementById("entryError")
                },
                
                ListPage: {
                    list: document.getElementById("diaryListBlock")
                },
                
                show: function(e) {
                    e.style.display = "block";
                },
                hide: function(e) {
                    e.style.display = "none";
                },
                openPage: function(p) {
                    if(p === View.listPage || p === View.entryPage) {
                        if(!userRef) {
                            return false;
                        }
                    }
                    View.hideAllPages();
                    p.style.display = "block";
                    return true;
                },
                hideAllPages: function() {
                    View.loginPage.style.display = "none";
                    View.listPage.style.display = "none";
                    View.entryPage.style.display = "none";
                    View.creatingPage.style.display = "none";
                },
                clickBtn: function(btn) {
                    View.homeBtn.className = "";
                    View.diaryListBtn.className = "";
                    btn.className = "active";
                }
            }
            
            const User = {
                account: "",
                password: ""
            }
            
            const Diary = {
                title: "",
                date: "",
                entry: ""
            }
            
            View.homeBtn.addEventListener("click", function() {
                View.openPage(View.loginPage);
                View.clickBtn(View.homeBtn);
            }, false);
            View.diaryListBtn.addEventListener("click", function() { 
                if(View.openPage(View.listPage)) {
                    View.clickBtn(View.diaryListBtn);
                }
            }, false);
            View.addBtn.addEventListener("click", function() {
                if(View.openPage(View.entryPage)) {
                }
            }, false);
            
            CreatingAccountView.btnCreate.addEventListener("click", () => {
                document.getElementById("passwordError").innerHTML = "";
                rootRef.once('value').then(snap => {
                    snap.forEach(user => {
                        if(user.val().account === CreatingAccountView.account.value.toLowerCase()) {
                            document.getElementById("accountError").innerHTML = "This User Name Has Been Used!";
                            throw false;
                        }
                    });
                }).then(() => {
                    document.getElementById("accountError").innerHTML = "";
                    if(CreatingAccountView.password.value != CreatingAccountView.comPassword.value) {
                        document.getElementById("passwordError").innerHTML = "The passwords are not matched!";
                        throw false;
                    } else if(CreatingAccountView.password.value.length < 4) {
                        document.getElementById("passwordError").innerHTML = "The password have to be at least 4 words";
                        throw false;
                    } else {
                        document.getElementById("passwordError").innerHTML = "";
                        document.getElementById("accountError").innerHTML = "";
                    }
                }).then(() => {
                    rootRef.push({
                        account: CreatingAccountView.account.value.toLowerCase(),
                        password: CreatingAccountView.password.value
                    });
                    View.openPage(View.loginPage);
                }).catch(reject => {});
            });
            
            
            
            View.LoginPage.btnLogin.addEventListener("click", () => {
                View.LoginPage.error.innerHTML = "";
                rootRef.once('value').then(snap => {
                    if(snap.forEach(user => {
                        if(user.val().account === View.LoginPage.txtAccount.value.toLowerCase()) {
                            if(user.val().password === View.LoginPage.txtPassword.value) {
                                userRef = rootRef.child(user.key);
                                View.openPage(View.listPage); 
                                View.clickBtn(View.diaryListBtn);
                                userRef.child('diaryList').on('value', snap => {
                                    View.ListPage.list.innerHTML = "";
                                    snap.forEach(diary => {
                                        var div = document.createElement('div');
                                        div.className = 'diaryBlock';
                                        var diaryKey = diary.key;
                                        div.value = diaryKey.toString();
                                        div.id = diaryKey.toString;
                                        var list = "";
                                        var title = diary.val().title;
                                        var date = diary.val().date;
                                        var content = diary.val().content.replace(/\n/g, "<br>");
                                        list = 
                                            "Title: " + title + "<br>" +
                                            "Date: " + date + "<br>" +
                                            "Content: <br>" +
                                            content;
                                        div.innerHTML = list;
                                        View.ListPage.list.insertBefore(div, View.ListPage.list.childNodes[0]);
                                        
                                        var divFunction = function() {
                                            View.hideAllPages();
                                            var session = document.createElement('session');
                                            session.id=diary.key + 'editPage';
                                            session.style="display:block";
                                            var form = document.createElement('form');
                                            var divTitle = document.createElement('div');
                                            divTitle.className = 'marginInputField';
                                            var inputTitle = document.createElement('input');
                                            inputTitle.className = 'inputField';
                                            inputTitle.type = 'text';
                                            inputTitle.id = diary.key + 'editTitle';
                                            divTitle.innerHTML = "Title: ";
                                            divTitle.appendChild(inputTitle);
                                            
                                            var divDate = document.createElement('div');
                                            divDate.className = 'marginInputField';
                                            var inputDate = document.createElement('input');
                                            inputDate.className = 'inputField';
                                            inputDate.type = 'date';
                                            inputDate.id = diary.key + 'editDate';
                                            divDate.innerHTML = "Date: ";
                                            divDate.appendChild(inputDate);
                                            
                                            var divEntry = document.createElement('div');
                                            divEntry.className = 'marginInputField';
                                            var inputEntry = document.createElement('textarea');
                                            inputEntry.style = 'margin-top: 10px; margin-left: 5px;';
                                            inputEntry.id = diary.key + 'editEntry';
                                            inputEntry.rows = '15';
                                            inputEntry.cols = '45';
                                            divEntry.innerHTML = "Entry: <br>";
                                            divEntry.appendChild(inputEntry);
                                            
                                            var btnSave = document.createElement('button');
                                            btnSave.type='button';
                                            btnSave.id=diary.key + 'saveDiary';
                                            btnSave.style='margin-left: 15px; margin-top: 15px;';
                                            btnSave.innerHTML = 'Save Diary';
                                            
                                            var btnDelete = document.createElement('button');
                                            btnDelete.type = 'button';
                                            btnDelete.id=diary.key + 'deleteDiary';
                                            btnDelete.style='margin-left: 15px; margin-top: 15px;';
                                            btnDelete.innerHTML = 'Delete Diary';
                                            
                                            form.appendChild(divTitle);
                                            form.appendChild(divDate);
                                            form.appendChild(divEntry);
                                            form.appendChild(btnSave);
                                            form.appendChild(btnDelete);
                                            
                                            session.appendChild(form);
                                            
                                            document.getElementById("body").appendChild(session);

                                            var diaryList = userRef.child('diaryList').child(div.value);
                                            diaryList.once('value', diary => {
                                                inputTitle.value = diary.val().title;
                                                inputDate.value = diary.val().date;
                                                inputEntry.value = diary.val().content;
                                                
                                                var mFunction = function() {
                                                    diaryList.set({
                                                        title: inputTitle.value,
                                                        date: inputDate.value,
                                                        content: inputEntry.value
                                                    });
                                                    View.openPage(View.listPage);
                                                    session.style='display:none';
                                                };
                                                
                                                btnSave.addEventListener('click', mFunction);
                                                
                                                btnDelete.addEventListener('click', () => {
                                                    diaryList.remove();
                                                    session.style='display:none';
                                                    View.openPage(View.listPage)
                                                });
                                            });
                                        };

                                        div.addEventListener('click', divFunction);
                                    });
                                });
                                
                                return true;
                            }
                        }
                    })) {
                        View.LoginPage.error.innerHTML = "";
                    }
                    else {
                        View.LoginPage.error.innerHTML = "User name or password incorrect!";
                    }
                });
            });
            
            View.LoginPage.btnCreateNewAccount.addEventListener("click", () => {
                View.openPage(View.creatingPage);
            });
            
            View.EntryPage.btnCreate.addEventListener("click", () => {
                View.EntryPage.error.innerHTML = "";
                if(View.EntryPage.txtTitle.value === "") {
                    View.EntryPage.error.innerHTML = "Please enter the title!";
                    View.EntryPage.txtTitle.focus();
                    return;
                }
                else if(View.EntryPage.txtContent.value === "" ) {
                    View.EntryPage.error.innerHTML = "Please Enter the contents!";
                    View.EntryPage.txtContent.focus();
                    return;
                }
                else {
                    userRef.child('diaryList').push({
                        title: View.EntryPage.txtTitle.value,
                        date: View.EntryPage.txtDate.value,
                        content: View.EntryPage.txtContent.value
                    });
                    
                    View.openPage(View.listPage);
                    View.clickBtn(View.diaryListBtn);
                }
                View.EntryPage.txtTitle.value = "";
                View.EntryPage.txtContent.value = "";
            });
            
            View.cancelBtn.addEventListener("click", () => {
                View.openPage(View.listPage);
                View.EntryPage.txtTitle.value = "";
                setToday();
                View.EntryPage.txtContent.value = "";
            });