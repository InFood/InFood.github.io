const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";

// get restaurant by restaurant id /api/v1/restaurant/{restaurant_id} needed user_id
async function getRestaurantByRestaurantId(restaurant_id, userId) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/" + restaurant_id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                "user_id": userId
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get restaurant by owner id /api/v1/restaurant/owner/{owner_id}
async function getRestaurantByOwnerId(owner_id) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/owner/" + owner_id,
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get restaurant list /api/v1/restaurant-list
async function getRestaurantList() {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant-list",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// search restaurant by owner id /api/v1/restaurant/search
async function getRestaurant(keyword, latitude, longitude, radius_km) {
    try {
        const data = {};
        if (keyword) {
            data.keyword = keyword;
        }
        if (latitude) {
            data.latitude = latitude;
        }
        if (longitude) {
            data.longitude = longitude;
        }
        if (radius_km) {
            data.radius_km = radius_km;
        }
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/search/",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: data
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get owner by restaurant id /api/v1/restaurant/{restaurant_id}/owner
async function getRestaurantOwner(restaurant_id) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/" + restaurant_id + "/owner",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get owner report by restaurant id /api/v1/restaurant/{restaurant_id}/owner-report
async function getRestaurantOwnerReport(restaurant_id, is_checked) {
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/" + restaurant_id + "/owner-report",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: {
                "is_checked": is_checked
            }
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// logic
function appendRestaurant(postRestaurant) {
    row = "";
    postRestaurant.forEach(element => {
        const imagesHtml = element.images.map(image => `<img src="${image.photo_url}" alt="Image" width="100">`).join('');
        row += `
            <tr>
                <td>${element.name}</td>
                <td>${element.google_id}</td>
                <td>${element.creator_id}</td>
                <td>${element.phone_number}</td>
                <td>${element.address}</td>
                <td>${element.geo_hash}</td>
                <td>${element.latitude}</td>
                <td>${element.longitude}</td>
                <td>${element.categories}</td>
                <td>${element.link}</td>
                <td>${element.id}</td>
                <td>${imagesHtml}</td>
                <td>${element.rating}</td>
                <td>${element.average_cost}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
            </tr>
        `
    });
    $("#restaurantTable tbody").append(row);
    $("#restaurantTable tbody").footable();
}

function appendUser(postUser) {
    thead = `
        <tr>
            <th data-name="fb_id">FB ID</th>
            <th data-name="in_id">In ID</th>
            <th data-name="username">UserName</th>
            <th data-name="firebase_id">Firebase ID</th>
            <th data-name="introduction">Introduction</th>
            <th data-name="display_name">Display Name</th>
            <th data-name="birthdate">Birthdate</th>
            <th data-name="email">Email</th>
            <th data-name="gender">Gender</th>
            <th data-name="hometown">Hometown</th>
            <th data-name="phonenumber">Phonenumber</th>
            <th data-name="residence">Residence</th>
            <th data-name="id">ID</th>
            <th data-name="images">Images</th>
            <th data-name="width">Width</th>
            <th data-name="height">Height</th>
            <th data-name="tags">Tag</th>
            <th data-name="create_time">Create Time</th>
            <th data-name="update_time">Update Time</th>
            <th data-name="follower_count">Follower Count</th>
            <th data-name="followee_count">Followee Count</th>
            <th data-name="post_count">Post Count</th>
            <th data-name="is_follower">Is Follower</th>
            <th data-name="is_followee">Is Followee</th>
        </tr>
    `
    $("#restaurantTable thead").append(thead);

    row = "";
    postUser.forEach(element => {
        const imagesHtml = element.images.map(image => `<img src="${image.photo_url}" alt="Image" width="100">`).join('');

        row += `
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
    });
    $("#restaurantTable tbody").append(row);
    $("#restaurantTable tbody").footable();
}

function appendReport(postReport) {
    thead = `
        <tr>
            <th data-name="id">ID</th>
            <th data-name="restaurant_id">Restaurant ID</th>
            <th data-name="user_id">User ID</th>
            <th data-name="is_approved">Is Approved</th>
            <th data-name="is_checked">Is Checked</th>
            <th data-name="create_time">Create Time</th>
            <th data-name="update_time">Update Time</th>
            <th data-name="fb_id">User FB ID</th>
            <th data-name="in_id">User In ID</th>
            <th data-name="username">UserUserName</th>
            <th data-name="firebase_id">User Firebase ID</th>
            <th data-name="introduction">User Introduction</th>
            <th data-name="display_name">User Display Name</th>
            <th data-name="birthdate">User Birthdate</th>
            <th data-name="email">User Email</th>
            <th data-name="gender">User Gender</th>
            <th data-name="hometown">User Hometown</th>
            <th data-name="phonenumber">User Phonenumber</th>
            <th data-name="residence">User Residence</th>
            <th data-name="id">User ID</th>
            <th data-name="images">User Images</th>
            <th data-name="width">User Width</th>
            <th data-name="height">User Height</th>
            <th data-name="tags">User Tag</th>
            <th data-name="create_time">User Create Time</th>
            <th data-name="update_time">User Update Time</th>
            <th data-name="follower_count">User Follower Count</th>
            <th data-name="followee_count">User Followee Count</th>
            <th data-name="post_count">User Post Count</th>
            <th data-name="is_follower">User Is Follower</th>
            <th data-name="is_followee">User Is Followee</th>
        </tr>
    `
    $("#restaurantTable thead").append(thead);

    row = "";
    postReport.forEach(element => {
        const imagesHtml = null;
        if (element.user.images != null)
        {
            imagesHtml = element.user.images.map(image => `<img src="${image.photo_url}" alt="Image" width="100">`).join('');
        }
        
        row += `
            <tr>
                <td>${element.id}</td>
                <td>${element.restaurant_id}</td>
                <td>${element.user_id}</td>
                <td>${element.is_approved}</td>
                <td>${element.is_checked}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
                <td>${element.user.fb_id}</td>
                <td>${element.user.in_id}</td>
                <td>${element.user.username}</td>
                <td>${element.user.firebase_id}</td>
                <td>${element.user.introduction}</td>
                <td>${element.user.display_name}</td>
                <td>${element.user.birthdate}</td>
                <td>${element.user.email}</td>
                <td>${element.user.gender}</td>
                <td>${element.user.hometown}</td>
                <td>${element.user.phonenumber}</td>
                <td>${element.user.residence}</td>
                <td>${element.user.id}</td>
                <td>${imagesHtml}</td>
                <td>${element.user.width}</td>
                <td>${element.user.height}</td>
                <td>${element.user.tags}</td>
                <td>${element.user.create_time}</td>
                <td>${element.user.update_time}</td>
                <td>${element.user.follower_count}</td>
                <td>${element.user.followee_count}</td>
                <td>${element.user.post_count}</td>
                <td>${element.user.is_follower}</td>
                <td>${element.user.is_followee}</td>
            </tr>
        `
    });
    $("#restaurantTable tbody").append(row);
    $("#restaurantTable tbody").footable();
}


async function SearchRestaurantByRestaurantId() {
    $("#restaurantTable tbody").empty();
    event.preventDefault();
    const restaurant_id = $("input[name=restaurant_id]").val();
    const user_id = $("input[name=user_id]").val();
    try {
        const response = await getRestaurantByRestaurantId(restaurant_id, user_id);
        appendRestaurant([response]);
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantByOwnerId() {
    $("#restaurantTable tbody").empty();
    event.preventDefault();
    const owner_id = $("input[name=owner_id]").val();
    try {
        const response = await getRestaurantByOwnerId(owner_id);
        appendRestaurant(response.restaurants);
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantList() {
    $("#restaurantTable tbody").empty();
    event.preventDefault();
    try {
        const response = await getRestaurantList();
        appendRestaurant(response.restaurants);
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurant() {
    $("#restaurantTable tbody").empty();
    event.preventDefault();
    const keyword = $("input[name=keyword]").val();
    const latitude = $("input[name=latitude]").val();
    const longitude = $("input[name=longitude]").val();
    const radius_km = $("input[name=radius_km]").val();
    try {
        const response = await getRestaurant(keyword, latitude, longitude, radius_km);
        appendRestaurant(response.restaurants);
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantOwner() {
    $("#restaurantTable thead").empty();
    $("#restaurantTable tbody").empty();
    event.preventDefault();
    const restaurant_id = $("input[name=restaurant_id]").val();
    try {
        const response = await getRestaurantOwner(restaurant_id);
        appendUser(response.users);
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantOwnerReport() {
    $("#restaurantTable thead").empty();
    $("#restaurantTable tbody").empty();
    event.preventDefault();
    const restaurant_id = $("input[name=restaurant_id]").val();
    const is_checked = $("input:radio[name=is_checked]:checked").val();
    try {
        const response = await getRestaurantOwnerReport(restaurant_id, is_checked);
        appendReport(response.owner_reports);
    } catch (error) {
        alert(error);
    }
}

// resturantByChange change the input search by
function restaurantByChange() {
    const restaurantBy = $('#getRestaurantBy').val();
    const restaurantContent = {
        "RestaurantID": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="RestaurantInfoByRestaurantId" onsubmit = "SearchRestaurantByRestaurantId();return false;">
                        <label for="restaurant_id">Restaurant ID</label>
                        <div class="form-group">
                            <input type="text" name="restaurant_id" placeholder="Search..." class="form-control">
                        </div>
                        <label for="uaer_id">User ID</label>
                        <div class="form-group">
                            <input type="text" name="user_id" placeholder="Search..." class="form-control">
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchRestaurantBtn" type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "OwnerID": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="RestaurantInfoByOwnerId" onsubmit = "SearchRestaurantByOwnerId();return false;">
                        <label for="owner_id">Owner ID</label>
                        <div class="form-group">
                            <input type="text" name="owner_id" placeholder="Search..." class="form-control">
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchRestaurantBtn" type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "List": `
        <div class="row">
            <div class="col-sm-12">
                <form role="form" name="RestaurantList" onsubmit = "SearchRestaurantList();return false;">
                    <div>
                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchRestaurantBtn" type="submit"><strong>Search</strong>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `,
        "Search": `
        <div class="row">
            <div class="col-sm-12">
                <form role="form" name="RestaurantSearch" onsubmit = "SearchRestaurant();return false;">
                    <label for="keyword">Keyword</label>
                    <div class="form-group">
                        <input type="text" name="keyword" placeholder="Search..." class="form-control">
                    </div>
                    <label for="latitude">Latitude</label>
                    <div class="form-group">
                        <input type="text" name="latitude" placeholder="Search..." class="form-control">
                    </div>
                    <label for="longitude">Longitude</label>
                    <div class="form-group">
                        <input type="text" name="longitude" placeholder="Search..." class="form-control">
                    </div>
                    <label for="radius_km">Radius Km</label>
                    <div class="form-group">
                        <input type="text" name="radius_km" placeholder="Search..." class="form-control">
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchRestaurantBtn" type="submit"><strong>Search</strong>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `,
        "Owner": `
        <div class="row">
            <div class="col-sm-12">
                <label for="restaurant_id">Restaurant ID</label>
                <div class="form-group">
                    <input type="text" name="restaurant_id" placeholder="Search..." class="form-control">
                </div>
                <form role="form" name="RestaurantOwner" onsubmit = "SearchRestaurantOwner();return false;">
                    <div>
                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchRestaurantBtn" type="submit"><strong>Search</strong>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `,
        "OwnerReport": `
        <div class="row">
            <div class="col-sm-12">
                <label for="is_checked">isCheck</label>
                <div class="form-group">
                    <label>
                        <input type="radio" checked="" value="true" id="isCheckOptionsRadios1" name="is_checked">true</label>
                    <label>
                        <input type="radio" value="false" id="isCheckOptionsRadios2" name="is_checked">false</label>
                </div>
                <label for="restaurant_id">Restaurant ID</label>
                <div class="form-group">
                    <input type="text" name="restaurant_id" placeholder="Search..." class="form-control">
                </div>
                <form role="form" name="RestaurantOwnerReport" onsubmit = "SearchRestaurantOwnerReport();return false;">
                    <div>
                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchRestaurantBtn" type="submit"><strong>Search</strong>
                        </button>
                    </div>
                </form>
            </div>
        </div>
        `
    }
    // empty restaurant_content
    $('#restaurant_content').empty();
    // append restaurant_content
    $('#restaurant_content').append(restaurantContent[restaurantBy]);
}