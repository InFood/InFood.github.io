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
        `
    }
    // empty restaurant_content
    $('#restaurant_content').empty();
    // append restaurant_content
    $('#restaurant_content').append(restaurantContent[restaurantBy]);
}