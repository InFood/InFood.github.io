const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";

// get restaurant owner reports by api/v1/restaurant/owner-report/list
async function getRestaurantReportList(owner_report_id, is_checked){
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

// approve report by report_id /api/v1/restaurant/owner-report/{owner_report_id}
async function approveReport(report_id, is_approved){
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

// logic
function appendReport(postReport) {
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
                <input type="checkbox" name="approved_checkbox" id='approved_${element.id}' value=${element.id} onClick="onChangeHandler(this.value)"></label>
                <label>
                </td>
            </tr>
        `
        $("#restaurantReportTable tbody").append(row);
        $("#restaurantReportTable tbody").footable();
        document.getElementById("checked_" + element.id).checked = element.is_checked;
        document.getElementById("approved_" + element.id).checked = element.is_approved;

    });
    
}

async function onChangeHandler(id) {
    const is_approved = $('input[id=approved_'+id+']:checkbox').is(":checked");
    try {
        const response = await approveReport(id, is_approved);
        
    } catch (error) {
        alert(error);
    }
}

async function SearchRestaurantOwnerReport() {
    $("#restaurantReportTable tbody").empty();
    event.preventDefault();
    const owner_report_id = $("input[name=owner_report_id]").val();
    const is_checked = $("input:radio[name=is_checked]:checked").val();
    try {
        const response = await getRestaurantReportList(owner_report_id, is_checked);
        appendReport(response.owner_reports);
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
        "ReportID": `
        <div class="row">
            <div class="col-sm-12">
                <form role="form" name="ReportID" id="searchReportByID" onsubmit = "SearchReportByID();return false;">
                    <label for="report_id">Report ID</label>
                    <div class="form-group">
                        <input type="text" name="report_id" placeholder="Search..." class="form-control">
                    </div>
                    <div>
                        <button class="btn btn-sm btn-primary pull-right m-t-n-xs" id="searchReportByIDrBtn" type="submit"><strong>Search</strong>
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