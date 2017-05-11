(function(){
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC7t1k568uC72rM-I17O4dbG_oQF6VHyqw",
        authDomain: "blogz-51ca2.firebaseapp.com",
        databaseURL: "https://blogz-51ca2.firebaseio.com",
        projectId: "blogz-51ca2",
        storageBucket: "blogz-51ca2.appspot.com",
        messagingSenderId: "972986545967"
    };
    firebase.initializeApp(config);   

    // Get Elements
    var title = $('#title');
    var content = $('#content');
    var btnSubmit = $('#btnSubmit');
    var postsList = $('#postsList');
    var deletePost;
    var box;

    // Create Reference
    var postsRef = firebase.database().ref().child('posts');
    
    btnSubmit.click(function() {
        var post = {
            title: title.val(),
            content: content.val()
        };

        title.val('');
        content.val('');

        // Post data to firebase server
        postsRef.push(post)

    });
    
    postsRef.on('value', function(snap) {
        postsList.empty();
        snap.forEach(function(child) {
            var postId = child.key;
            box = renderBox(child);
            postsList.append(box);

            deletePost = $(`#${postId}`);
            deletePost.click(function(e) {
                postsRef.child(this.id).remove();
            })
        });
    });
}());

function renderBox(child) {
    var postId = child.key
    var post = child.val();
    //posts[key] = value;

    var boxPost = `
        <div class="box">
            <article class="media">
                    <div class="media-left">
                        <figure class="image is-64x64">
                            <img src="http://bulma.io/images/placeholders/128x128.png" alt="Image">
                        </figure>
                    </div>
                    <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>${post.title}</strong>
                            <br>
                            ${post.content}
                            </p>
                        </div>
                    </div>
                    <div class="media-right">
                        <button id="${postId}" class="delete"></button>
                    </div>
            </article>
        </div>`;

    return boxPost;
    
}


