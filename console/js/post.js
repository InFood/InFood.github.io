const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";
// event
// search by change event

// api
// 
// get post by follower /api/v1/user/{user_id}/followee/post option myid
async function getPostByFolloweeId(myid, followeeId) {
    const data = {};
    if (myid) {
        data.my_id = myid;
    }

    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/user/" + followeeId + "/followee/post",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: data
        });
        return response;
    } catch (error) {
        throw error;
    }
}

// get post by restaurant /api/v1/restaurant/{restaurant_id}/post needed myid
async function getPostByRestaurantId(myid, restaurantId) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/" + restaurantId + "/post",
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
    } catch (error) {
        throw error;
    }
}

// get post by user /api/v1/user/{user_id}/post needed myid
async function getPostByUserId(myid, userId) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/user/" + userId + "/post",
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

// get post by food-item /api/v1/food_item/{food_item_id}/post needed myid
async function getPostByFoodItemId(myid, foodItemId) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/food_item/" + foodItemId + "/post",
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

// get post by post /api/v1/post/{post_id} needed user_id
async function getPostByPostId(myid, postId) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/post/" + postId,
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


// logic
function appendPost(postList) {
    row = "";
    postList.forEach(element => {
        const imagesHtml = element.images.map(image => `<img src="${image.photo_url}" alt="Image" width="100">`).join('');

        row += `
            <tr>
                <td>${element.user_id}</td>
                <td>${element.restaurant_id}</td>
                <td>${element.content}</td>
                <td>${element.rating}</td>
                <td>${element.like_count}</td>
                <td>${element.reply_count}</td>
                <td>${element.restaurant_name}</td>
                <td>${element.user_display_name}</td>
                <td>${element.latitude}</td>
                <td>${element.longitude}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
                <td>${imagesHtml}</td>
            </tr>
        `
    });

    $("#postTable tbody").append(row);
    $("#postTable tbody").footable();
}

// submit post 
async function SearchPostByFollowee() {
    $("#postTable tbody").empty();
    event.preventDefault();
    const myid = $("input[name=my_id]").val();
    const followee_id = $("input[name=followee_id]").val();
    try {
        const response = await getPostByFolloweeId(myid, followee_id);
        appendPost(response.post_list);
    } catch (error) {
        alert(error);
    }
}

async function SearchPostByRestaurant() {
    $("#postTable tbody").empty();
    event.preventDefault();
    const myid = $("input[name=my_id]").val();
    const restaurant_id = $("input[name=restaurant_id]").val();
    try {
        const response = await getPostByRestaurantId(myid, restaurant_id);
        appendPost(response.post_list);
    } catch (error) {
        alert(error);
    }
}

async function SearchPostByUser() {
    $("#postTable tbody").empty();
    event.preventDefault();
    const myid = $("input[name=my_id]").val();
    const user_id = $("input[name=user_id]").val();
    try {
        const response = await getPostByUserId(myid, user_id);
        appendPost(response.post_list);
    } catch (error) {
        alert(error);
    }
}

async function SearchPostByFoodItem() {
    $("#postTable tbody").empty();
    event.preventDefault();
    const myid = $("input[name=my_id]").val();
    const fooditem_id = $("input[name=fooditem_id]").val();
    try {
        const response = await getPostByFoodItemId(myid, fooditem_id);
        appendPost(response.post_list);
    } catch (error) {
        alert(error);
    }
}

async function SearchPostByPost() {
    $("#postTable tbody").empty();
    event.preventDefault();
    const myid = $("input[name=my_id]").val();
    const post_id = $("input[name=post_id]").val();
    console.log(myid, post_id);
    try {
        const response = await getPostByPostId(myid, post_id);
        appendPost(response.post_list);
    } catch (error) {
        alert(error);
    }
}

// postByChange change the input search by
function postByChange() {
    const postBy = $('#getPostBy').val();
    const postContent = {
        "Followee": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="postRestaurantList" onsubmit="SearchPostByFollowee()">
                        <label for="my_id">My ID</label>
                        <div class="form-group">
                            <input type="text" name="my_id" placeholder="Search..." class="form-control" >
                        </div>
                        <label for="followee_id">Followee ID</label>
                        <div class="form-group">
                            <input type="text" name="followee_id" placeholder="Search..."
                                class="form-control" required="required" >
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "Restaurant": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="postRestaurantList" onsubmit="SearchPostByRestaurant()">
                        <label for="my_id">My ID</label>
                        <div class="form-group">
                            <input type="text" name="my_id" placeholder="Search..." class="form-control" required="required" >
                        </div>
                        <label for="restaurant_id">Restaurant ID</label>
                        <div class="form-group">
                            <input type="text" name="restaurant_id" placeholder="Search..."
                                class="form-control" required="required" >
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>    
        `,
        "User": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="postRestaurantList" onsubmit="SearchPostByUser()">
                        <label for="my_id">My ID</label>
                        <div class="form-group">
                            <input type="text" name="my_id" placeholder="Search..." class="form-control" required="required" >
                        </div>
                        <label for="user_id">User ID</label>
                        <div class="form-group">
                            <input type="text" name="user_id" placeholder="Search..."
                                class="form-control" required="required" >
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "Food-Item": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="postRestaurantList" onsubmit="SearchPostByFoodItem()">
                        <label for="my_id">My ID</label>
                        <div class="form-group">
                            <input type="text" name="my_id" placeholder="Search..." class="form-control" required="required" >
                        </div>
                        <label for="fooditem_id">Food Item ID</label>
                        <div class="form-group">
                            <input type="text" name="fooditem_id" placeholder="Search..."
                                class="form-control" required="required" >
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs"
                                type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "Post-ID": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="postRestaurantList" onsubmit="SearchPostByPost()">
                        <label for="my_id">My ID</label>
                        <div class="form-group">
                            <input type="text" name="my_id" placeholder="Search..." class="form-control" required="required" >
                        </div>
                        <label for="post_id">Post ID</label>
                        <div class="form-group">
                            <input type="text" name="post_id" placeholder="Search..."
                                class="form-control" required="required" >
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
    // empty post_content
    $('#post_content').empty();
    // append post_content
    $('#post_content').append(postContent[postBy]);
}