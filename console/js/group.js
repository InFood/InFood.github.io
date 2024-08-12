const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";

// get group by keyword
async function getGroupByKeyword(keyword, type) {
    let data = {
        "keyword": keyword,
        "type": type
    };

    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/group/search",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: data,
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get group by owner required owner id optional type /api/v1/group/owner
async function getGroupByOwner(ownerId, type) {
    let data = {
        "owner_id": ownerId,
    };
    if (type) {
        data.type = type;
    }

    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/group/owner",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: data,
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get group by restaurant required restaurant id optional type  /api/v1/group/restaurant
async function getGroupByRestaurant(restaurantId, type) {
    let data = {
        "restaurant_id": restaurantId,
    };
    if (type) {
        data.type = type;
    }

    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/group/restaurant",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: data,
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// get group by group id optional type /api/v1/group
async function getGroupByGroupId(groupId, type) {
    let data = {
        "group_id": groupId,
    };
    if (type) {
        data.type = type;
    }

    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/group",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            data: data,
        });
        return response;
    }
    catch (error) {
        throw error;
    }
}

// logic 
// append group by grouplist api
// logic
function appendGroup(groupList) {
    row = "";
    groupList.forEach(element => {
        row += `
            <tr>
                <td>${element.owner_report_num}</td>
                <td>${element.restaurant_report_num}</td>
                <td>${element.restaurant_num}</td>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.type}</td>
                <td>${element.creator_id}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
            </tr>
        `;
    });

    $("#groupTable tbody").append(row);
    $("#groupTable tbody").footable();
}



// get group by keyword
async function GroupByKeyword() {
    $("#groupTable tbody").empty();
    event.preventDefault();
    const keyword = $("input[name='keyword']").val();
    const type = $("input[name='type']").val();
    try {
        const response = await getGroupByKeyword(keyword, type);
        appendGroup(response.groups);
    }
    catch (error) {
        alert(error);
    }
}

// get group by owner
async function GroupByOwner() {
    $("#groupTable tbody").empty();
    console.log("GroupByOwner");
    event.preventDefault();
    const ownerId = $("input[name='owner_id']").val();
    const type = $("input[name='type']").val();
    try {
        const response = await getGroupByOwner(ownerId, type);
        appendGroup(response.groups);
    }
    catch (error) {
        alert(error);
    }
}

// get group by restaurant
async function GroupByRestaurant() {
    $("#groupTable tbody").empty();
    event.preventDefault();
    const restaurantId = $("input[name='restaurant_id']").val();
    const type = $("input[name='type']").val();
    try {
        const response = await getGroupByRestaurant(restaurantId, type);
        appendGroup(response.groups);
    }
    catch (error) {
        alert(error);
    }
}

// get group by group id
async function GroupByGroupId() {
    $("#groupTable tbody").empty();
    event.preventDefault();
    const groupId = $("input[name='group_id']").val();
    const type = $("input[name='type']").val();
    try {
        const response = await getGroupByGroupId(groupId, type);
        appendGroup(response.groups);
    }
    catch (error) {
        alert(error);
    }
}

// select onchange 
function groupByChange() {
    const groupby = $("#getGroupBy").val();
    const groupContent = {
        "Keyword": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="GroupByKeywordname" onsubmit="GroupByKeyword()">
                        <label for="keyword">Keyword</label>
                        <div class="form-group">
                            <input type="text" name="keyword" placeholder="Search..." class="form-control" required="required">
                        </div>
                        <label for="type">Type</label>
                        <div class="form-group">
                            <input type="text" name="type" placeholder="Search..."
                                class="form-control" required="required">
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
        "Owner": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="GroupByOwnername" onsubmit="GroupByOwner()">
                        <label for="owner_id">Owner ID</label>
                        <div class="form-group">
                            <input type="text" name="owner_id" placeholder="Search..." class="form-control" required="required">
                        </div>
                        <label for="type">Type</label>
                        <div class="form-group">
                            <input type="text" name="type" placeholder="Search..."
                                class="form-control">
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
                    <form role="form" name="GroupByRestaurantname" onsubmit="GroupByRestaurant()">
                        <label for="restaurant_id">Restaurant ID</label>
                        <div class="form-group ">
                            <input type="text" name="restaurant_id" placeholder="Search..." class="form-control" required="required">
                            </div>
                            <label for="type">Type</label>
                            <div class="form-group
                            ">
                            <input type="text" name="type" placeholder="Search..." class="form-control">
                            </div>
                            <div>
                                <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit"><strong>Search</strong></button>
                                </div>
                                </form>
                                </div>
                                </div>
                                    `,
        "Group_id": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="GroupByGroupIdname" onsubmit="GroupByGroupId()">
                        <label for="group_id">Group ID</label>
                        <div class="form-group">
                            <input type="text" name="group_id" placeholder="Search..." class="form-control" required="required">
                        </div>
                        <label for="type">Type</label>
                        <div class="form-group">
                        <input type="text" name="type" placeholder="Search..." class="form-control">
                        </div>
                        <div>
                            <button class="btn btn-sm btn-primary pull-right m-t-n-xs" type="submit"><strong>Search</strong></button>
                        </div>
                    </form>
                </div>
            </div>
        `
    }

    $("#group_content").empty().append(groupContent[groupby]);
}