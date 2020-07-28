var app = new Vue({
    el: '#app',
    data:{
        errorMsg: "",
        successMsg: "",
        showAddModal: false,
        showEditModal: false,
        showDeleteModal: false,
        users: [],
        newUser: {name: "", email: "", phone: ""},
        currentUser: {}
    },
    mounted () {
        this.getAllUsers();
    },
    methods: {
        getAllUsers() {
            axios.get("http://localhost/crud-vue-php/process.php?action=read").then(function(response){
                if (response.data.error){
                    app.errorMsg = response.data.message;
                } 
                else {
                    app.users = response.data.users;
                }
            });
        },
        addUser() {
            var formData = app.toFormData(app.newUser);
            
            axios.post("http://localhost/crud-vue-php/process.php?action=create", formData).then(function(response){
                app.newUser = {name: "", email: "", phone: ""};    
                if (response.data.error){
                        app.errorMsg = response.data.message;
                    } 
                else {
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        toFormData(obj) {
            var fd = new FormData();
            for(var i in obj) {
                fd.append(i,obj[i]);
            }

            return fd;
        },
        updateUser() {
            var formData = app.toFormData(app.currentUser);
            
            axios.post("http://localhost/crud-vue-php/process.php?action=update", formData).then(function(response){
                app.currentUser = {};    
                if (response.data.error){
                        app.errorMsg = response.data.message;
                    } 
                else {
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        selectUser(user) {
            app.currentUser = user;

        },

        deleteUser() {
            var formData = app.toFormData(app.currentUser);
            
            axios.post("http://localhost/crud-vue-php/process.php?action=delete", formData).then(function(response){
                app.currentUser = {};    
                if (response.data.error){
                        app.errorMsg = response.data.message;
                    } 
                else {
                    app.successMsg = response.data.message;
                    app.getAllUsers();
                }
            });
        },
        clearMsg() {
            app.errorMsg = "";
            app.successMsg = "";
        }
    }
});