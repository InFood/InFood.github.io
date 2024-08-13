const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";

// get user by user id /api/v1/user/{user_id} needed myid
async function getUserByUserId(myid, userId) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/user/" + userId,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                "my_id": myid
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get user by firebase id /api/v1/user/firebase/{firebase_id}
async function getUserByFirebaseId(firebase_id) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/user/firebase/" + firebase_id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// logic
function appendUser(element) {

    const imagesHtml = element.images.map(image => `<img src="${image.photo_url}" alt="Image" width="100">`).join('');

    row = `
        <tr>
            <td>${element.fb_id}</td>
            <td>${element.in_id}</td>
            <td>${element.username}</td>
            <td>${element.firebase_id}</td>
            <td>${element.introduction}</td>
            <td>${element.display_name}</td>
            <td>${element.birthdate}</td>
            <td>${element.email}</td>
            <td>${element.gender}</td>
            <td>${element.hometown}</td>
            <td>${element.phonenumber}</td>
            <td>${element.residence}</td>
            <td>${element.id}</td>
            <td>${imagesHtml}</td>
            <td>${element.width}</td>
            <td>${element.height}</td>
            <td>${element.tags}</td>
            <td>${element.create_time}</td>
            <td>${element.update_time}</td>
            <td>${element.follower_count}</td>
            <td>${element.followee_count}</td>
            <td>${element.post_count}</td>
            <td>${element.is_follower}</td>
            <td>${element.is_followee}</td>
        </tr>
    `

    $("#userTable tbody").append(row);
    $("#userTable tbody").footable();
}

async function SearchUserByUserId() {
    $("#userTable tbody").empty();
    event.preventDefault();
    const myid = $("input[name=my_id]").val();
    const user_id = $("input[name=user_id]").val();
    try {
        const response = await getUserByUserId(myid, user_id);
        appendUser(response);
    } catch (error) {
        alert(error);
    }
}

async function SearchUserByFirebaseId() {
    $("#userTable tbody").empty();
    event.preventDefault();
    const firebase_id = $("input[name=firebase_id]").val();
    try {
        const response = await getUserByFirebaseId(firebase_id);
        appendUser(response);
    } catch (error) {
        alert(error);
    }
}

// userByChange change the input search by
function userByChange() {
    const userBy = $('#getUserBy').val();
    const userContent = {
        "UserID": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="searchUser" id="searchUser" onsubmit = "SearchUserByUserId();return false;">
                        <label for="my_id">My ID</label>
                        <div class="form-group">
                            <input type="text" name="my_id" placeholder="Search..." class="form-control">
                        </div>
                        <label for="uaer_id">User ID</label>
                        <div class="form-group">
                            <input type="text" name="user_id" placeholder="Search..." class="form-control">
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchUserBtn" type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "FirebaseID": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="postRestaurantList" onsubmit="SearchUserByFirebaseId()">
                        <label for="firebase_id">Firebase ID</label>
                        <div class="form-group">
                            <input type="text" name="firebase_id" placeholder="Search..." class="form-control" required="required" >
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>    
        `
    }
    // empty user_content
    $('#user_content').empty();
    // append user_content
    $('#user_content').append(userContent[userBy]);
}