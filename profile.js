// Ensure you've included Firebase SDK scripts in your HTML before this script

// Your Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDs2gZJ6wIRDOqEtzyIT7toug3Xs3-_w1E",
    authDomain: "user-7c7f8.firebaseapp.com",
    projectId: "user-7c7f8",
    storageBucket: "user-7c7f8.appspot.com",
    messagingSenderId: "55544751979",
    appId: "1:55544751979:web:40366cb78cb1cf8162ce2e",
    measurementId: "G-FP9KRJ1GV3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('profileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Form validation
    var allFilled = true;
    document.querySelectorAll('.input100').forEach(function(input) {
        if (!input.value) {
            allFilled = false;
        }
    });

    if (!allFilled) {
        alert('Please fill all the information.');
        return;
    }

    // Save information to Firebase
    const user = firebase.auth().currentUser;
    if (user) {
        const dbRef = firebase.database().ref('users/' + user.uid);

        // Collect user input
        const firstName = document.querySelector('input[name="firstName"]').value;
        const lastName = document.querySelector('input[name="lastName"]').value;
        const gender = document.querySelector('select[name="gender"]').value;
        const dob = document.querySelector('input[name="dob"]').value;

        
        // Create user data object
        let updates = {
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            dob: dob
        };

        // Update the database
        dbRef.update(updates).then(() => {
            alert('Profile successfully filled');
        }).catch((error) => {
            console.error(error);
            alert('Failed to save information: ' + error.message);
        });
    } else {
        alert('No user signed in.');
        window.location.href = 'login.html';
    }
});

// Redirect if not logged in
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        window.location.href = 'login.html';
    }
});
