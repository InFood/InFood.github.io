const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";

// get restaurant owner reports by api/v1/restaurant/owner-report/list
async function getRestaurantOwnerReportList(owner_report_id, is_checked){
    try {
        const data = {};
        if (owner_report_id){
            data.owner_report_id = owner_report_id;
        }
        if (is_checked){
            data.is_checked = is_checked;
        }
        
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/owner-report/list",
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

// get restaurant reports by api/v1/reports/restaurants
async function getRestaurantReportList(restaurant_id, restaurant_report_id, is_checked, is_approved){
    try {
        const data = {};
        if (restaurant_id){
            data.restaurant_id = restaurant_id;
        }
        if (restaurant_report_id){
            data.restaurant_report_id = restaurant_report_id;
        }
        if (is_checked){
            data.is_checked = is_checked;
        }
        if (is_approved){
            data.is_approved = is_approved;
        }
        
        const response = await $.ajax({
            url: URLcus + "api/v1/reports/restaurants",
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

// approve report by report_id /api/v1/restaurant/owner-report/{owner_report_id}
async function approveOwnerReport(report_id, is_approved){
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/restaurant/owner-report/" + report_id + "?is_approve=" + is_approved,
            method: "PUT",
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

// approve report by restaurant_report_id api/v1/reports/restaurants/{restaurant_report_id}

async function approveRestaurantReport(restaurant_report_id, is_approved){
    try {
        const data = {
            "name": document.getElementById("creator_id_" + restaurant_report_id).checked,
            "google_id": document.getElementById("google_id_" + restaurant_report_id).checked,
            "creator_id": document.getElementById("creator_id_" + restaurant_report_id).checked,
            "phone_number": document.getElementById("phone_number_" + restaurant_report_id).checked,
            "address": document.getElementById("address_" + restaurant_report_id).checked,
            "geo_hash": document.getElementById("geo_hash_" + restaurant_report_id).checked,
            "latitude": document.getElementById("latitude_" + restaurant_report_id).checked,
            "longitude": document.getElementById("longitude_" + restaurant_report_id).checked,
            "categories": document.getElementById("categories_" + restaurant_report_id).checked,
            "link": document.getElementById("link_" + restaurant_report_id).checked,
            "rating": document.getElementById("rating_" + restaurant_report_id).checked,
            "average_cost": document.getElementById("average_cost_" + restaurant_report_id).checked
        }
        const response = await $.ajax({
            url: URLcus + "api/v1/reports/restaurants/" + restaurant_report_id + "?is_approved=" + is_approved,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            dataType: 'json',
            data: JSON.stringify(data)
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// logic
function appendOwnReport(postReport) {
    thead = `
        <tr>
        <th data-name="id">ID</th>
        <th data-name="restaurant_id">Restaurant ID</th>
        <th data-name="user_id">User ID</th>
        <th data-name="create_time">Create Time</th>
        <th data-name="update_time">Update Time</th>
        <th data-name="check">is Checked</th>
        <th data-name="fb_id">User FB ID</th>
        <th data-name="in_id">User In ID</th>
        <th data-name="username">UserName</th>
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
        <th data-name="is_checked">Is Checked</th>
        <th data-name="is_approved">Is Approved</th>
        </tr>
    `
    $("#restaurantReportTable thead").append(thead);
    postReport.forEach(element => {
        const imagesHtml = null;
        if (element.user.images != null)
        {
            imagesHtml = element.user.images.map(image => `<img src="${image.photo_url}" alt="Image" width="100">`).join('');
        }
        
        row = `
            <tr>
                <td>${element.id}</td>
                <td>${element.restaurant_id}</td>
                <td>${element.user_id}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
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
                <td>
                <label>
                <input type="checkbox" name="checked_checkbox" id='checked_${element.id}' value=${element.is_checked} disabled=""></label>
                <label>
                </td>
                <td>
                <label>
                <input type="checkbox" name="approved_checkbox" id='approved_${element.id}' value=${element.id} disabled=""></label>
                <label>
                </td>
                <td><button class="btn btn-sm btn-info m-t-n-xs" id='approve_btn_${element.id}' type="submit" value=${element.id} onclick="onChangeOwnerHandler(this.value, true)">Approve</button></td>
                <td><button class="btn btn-sm btn-info m-t-n-xs" id='reject_btn_${element.id}' type="submit" value=${element.id} onclick="onChangeOwnerHandler(this.value, false)">Reject</button></td>
            </tr>
        `
        $("#restaurantReportTable tbody").append(row);
        $("#restaurantReportTable tbody").footable();
        document.getElementById("checked_" + element.id).checked = element.is_checked;
        document.getElementById("approved_" + element.id).checked = element.is_approved;
        document.getElementById("approve_btn_" + element.id).disabled = element.is_checked;
        document.getElementById("reject_btn_" + element.id).disabled = element.is_checked;

    });
}

function appendReport(postReport) {
    thead = `
        <tr>
        <th data-name="id">ID</th>
        <th data-name="restaurant_id">Restaurant ID</th>
        <th data-name="name">Name</th>
        <th data-name="google_id">Google ID</th>
        <th data-name="creator_id">Creator ID</th>
        <th data-name="phone_number">Phone Number</th>
        <th data-name="address">Address</th>
        <th data-name="geo_hash">Geo Hash</th>
        <th data-name="latitude">Latitude</th>
        <th data-name="longitude">Longitude</th>
        <th data-name="categories">categories</th>
        <th data-name="link">Link</th>
        <th data-name="rating">Rating</th>
        <th data-name="average_cost">Average Cost</th>
        <th data-name="create_time">Create Time</th>
        <th data-name="update_time">Update Time</th>
        <th data-name="is_checked">Is Checked</th>
        <th data-name="is_approved">Is Approved</th>
        </tr>
    `
    $("#restaurantReportTable thead").append(thead);
    postReport.forEach(element => {
        row = `
            <tr>
                <td>${element.id}</td>
                <td>${element.restaurant_id}</td>
                <td>
                <label><input type="checkbox" id='name_${element.id}' value='${element.name}'></label>
                ${element.name}</td>
                <td>
                <label><input type="checkbox" id='google_id_${element.id}'></label>
                ${element.google_id}</td>
                <td>
                <label><input type="checkbox" id='creator_id_${element.id}' value='${element.creator_id}'></label>
                ${element.creator_id}</td>
                <td>
                <label><input type="checkbox" id='phone_number_${element.id}'></label>
                ${element.phone_number}</td>
                <td>
                <label><input type="checkbox" id='address_${element.id}'></label>
                ${element.address}</td>
                <td>
                <label><input type="checkbox" id='geo_hash_${element.id}'></label>
                ${element.geo_hash}</td>
                <td>
                <label><input type="checkbox" id='latitude_${element.id}'></label>
                ${element.latitude}</td>
                <td>
                <label><input type="checkbox" id='longitude_${element.id}'></label>
                ${element.longitude}</td>
                <td>
                <label><input type="checkbox" id='categories_${element.id}'></label>
                ${element.categories}</td>
                <td>
                <label><input type="checkbox" id='link_${element.id}'></label>
                ${element.link}</td>
                <td>
                <label><input type="checkbox" id='rating_${element.id}'></label>
                ${element.rating}</td>
                <td>
                <label><input type="checkbox" id='average_cost_${element.id}'></label>
                ${element.average_cost}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
                <td>
                <label>
                <input type="checkbox" name="checked_checkbox" id='checked_${element.id}' disabled=""></label>
                <label>
                </td>
                <td>
                <label>
                <input type="checkbox" name="approved_checkbox" id='approved_${element.id}' disabled=""></label>
                <label>
                </td>
                <td><button class="btn btn-sm btn-info m-t-n-xs" id='approve_btn_${element.id}' type="submit" value=${element.id} onclick="onChangeRestaurantHandler(this.value, true)">Approve</button></td>
                <td><button class="btn btn-sm btn-info m-t-n-xs" id='reject_btn_${element.id}' type="submit" value=${element.id} onclick="onChangeRestaurantHandler(this.value, false)">Reject</button></td>
            </tr>
        `
        $("#restaurantReportTable tbody").append(row);
        $("#restaurantReportTable tbody").footable();
        document.getElementById("checked_" + element.id).checked = element.is_checked;
        document.getElementById("approved_" + element.id).checked = element.is_approved;
        document.getElementById("approve_btn_" + element.id).disabled = element.is_checked;
        document.getElementById("reject_btn_" + element.id).disabled = element.is_checked;
       
        document.getElementById("name_" + element.id).disabled = (element.name == null);
        document.getElementById("google_id_" + element.id).disabled = (element.google_id == null);
        document.getElementById("creator_id_" + element.id).disabled = (element.creator_id == null);
        document.getElementById("phone_number_" + element.id).disabled = (element.phone_number == null);
        document.getElementById("address_" + element.id).disabled = (element.address == null);
        document.getElementById("geo_hash_" + element.id).disabled = (element.geo_hash == null);
        document.getElementById("latitude_" + element.id).disabled = (element.latitude == null);
        document.getElementById("longitude_" + element.id).disabled = (element.longitude == null);
        document.getElementById("categories_" + element.id).disabled = (element.categories == null);
        document.getElementById("link_" + element.id).disabled = (element.link == null);
        document.getElementById("rating_" + element.id).disabled = (element.rating == null);
        document.getElementById("average_cost_" + element.id).disabled = (element.average_cost == null);

    });
}


async function onChangeOwnerHandler(id, is_approved) {
    document.getElementById("checked_" + id).checked = true;
    document.getElementById("approved_" + id).checked = is_approved;
    document.getElementById("approve_btn_" + id).disabled = true;
    document.getElementById("reject_btn_" + id).disabled = true;
    try {
        const response = await approveOwnerReport(id, is_approved);

    } catch (error) {
        alert(error);
    }
}

async function onChangeRestaurantHandler(id, is_approved) {
    document.getElementById("checked_" + id).checked = true;
    document.getElementById("approved_" + id).checked = is_approved;
    document.getElementById("approve_btn_" + id).disabled = true;
    document.getElementById("reject_btn_" + id).disabled = true;

    try {
        const response = await approveRestaurantReport(id, is_approved);

    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantOwnerReport() {
    $("#restaurantReportTable thead").empty();
    $("#restaurantReportTable tbody").empty();
    event.preventDefault();
    const owner_report_id = $("input[name=owner_report_id]").val();
    const is_checked = $("input:radio[name=is_checked]:checked").val();
    try {
        const response = await getRestaurantOwnerReportList(owner_report_id, is_checked);
        appendOwnReport(response.owner_reports);
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantReport() {
    $("#restaurantReportTable thead").empty();
    $("#restaurantReportTable tbody").empty();
    event.preventDefault();
    const restaurant_id = $("input[name=restaurant_id]").val();
    const restaurant_report_id = $("input[name=restaurant_report_id]").val();
    const is_checked = $("input:radio[name=is_checked]:checked").val();
    const is_approved = $("input:radio[name=is_approved]:checked").val();
    try {
        const response = await getRestaurantReportList(restaurant_id, restaurant_report_id, is_checked, is_approved);
        appendReport(response.restaurant_reports);
    } catch (error) {
        alert(error);
    }
}

// reportByChange change the input search by
function restaurantReportByChange() {
    const reportBy = $('#getRestaurantReportBy').val();
    const reportContent = {
        "RestaurantOwnerReportList": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="RestaurantOwnerReportList" id="searchRestaurantOwnerReport" onsubmit = "SearchRestaurantOwnerReport();return false;">
                        <label for="owner_report_id">Owner Report ID</label>
                        <div class="form-group">
                            <input type="text" name="owner_report_id" placeholder="Search..." class="form-control">
                        </div>
                        <label for="is_checked">isCheck</label>
                        <div class="form-group">
                            <label>
                                <input type="radio" value="true" id="isCheckOptionsRadios1" name="is_checked">true</label>
                            <label>
                                <input type="radio" value="false" id="isCheckOptionsRadios2" name="is_checked">false</label>
                                <label>
                                <input type="radio" checked="" value="" id="isCheckOptionsRadios3" name="is_checked">both</label>
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchReportListrBtn" type="submit"><strong>Search</strong>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `,
        "RestaurantReportList": `
        <div class="row">
            <div class="col-sm-12">
                <form role="form" name="RestaurantReportList" id="searchRestaurantReport" onsubmit = "SearchRestaurantReport();return false;">
                    <label for="restaurant_id">Restaurant ID</label>
                    <div class="form-group">
                        <input type="text" name="restaurant_id" placeholder="Search..." class="form-control">
                    </div>
                    <label for="restaurant_report_id">Restaurant Report ID</label>
                    <div class="form-group">
                        <input type="text" name="restaurant_report_id" placeholder="Search..." class="form-control">
                    </div>
                    <label for="is_checked">isCheck</label>
                    <div class="form-group">
                        <label>
                            <input type="radio" value="true" id="isCheckOptionsRadios1" name="is_checked">true</label>
                        <label>
                            <input type="radio" value="false" id="isCheckOptionsRadios2" name="is_checked">false</label>
                            <label>
                            <input type="radio" checked="" value="" id="isCheckOptionsRadios3" name="is_checked">both</label>
                    </div>
                    <label for="is_apporoved">isApprove</label>
                    <div class="form-group">
                        <label>
                            <input type="radio" value="true" id="isApprovedOptionsRadios1" name="is_approved">true</label>
                        <label>
                            <input type="radio" value="false" id="isApprovedOptionsRadios2" name="is_approved">false</label>
                            <label>
                            <input type="radio" checked="" value="" id="isApprovedOptionsRadios3" name="is_approved">both</label>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchReportListrBtn" type="submit"><strong>Search</strong>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `
    }
    // empty restuarant_report_content
    $('#restuarant_report_content').empty();
    // append restuarant_report_content
    $('#restuarant_report_content').append(reportContent[reportBy]);
}