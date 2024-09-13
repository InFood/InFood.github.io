const URLcus = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";

// get reports /api/v1/report
async function getReportList(content_type, content_id, is_checked, reason_type){
    try {
        const data = {};
        if (content_type){
            data.content_type = content_type;
        }
        if (content_id){
            data.content_id = content_id;
        }
        if (is_checked){
            data.is_checked = is_checked;
        }
        if (reason_type){
            data.reason_type = reason_type;
        }
        const response = await $.ajax({
            url: URLcus + "api/v1/reports/",
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

// get reports by report_id /api/v1/report/{report_id}
async function getReportByID(report_id){
    try {
        const response = await $.ajax({
            url: URLcus + "api/v1/reports/" + report_id,
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
function appendReport(postReport) {
    row = "";
    postReport.forEach(element => {
        row += `
            <tr>
                <td>${element.id}</td>
                <td>${element.user_id}</td>
                <td>${element.content_id}</td>
                <td>${element.content_type}</td>
                <td>${element.reason_type}</td>
                <td>${element.reason}</td>
                <td>${element.is_checked}</td>
                <td>${element.create_time}</td>
                <td>${element.update_time}</td>
            </tr>
        `
    });
    $("#reportTable tbody").append(row);
    $("#reportTable tbody").footable();
}

async function SearchReport() {
    $("#reportTable tbody").empty();
    event.preventDefault();
    const content_type = $("input[name=content_type]").val();
    const content_id = $("input[name=content_id]").val();
    const is_checked = $("input:radio[name=is_checked]:checked").val();
    const reason_type = $("input[name=reason_type]").val();
    try {
        const response = await getReportList(content_type, content_id, is_checked, reason_type);
        appendReport(response.reports);
    } catch (error) {
        alert(error);
    }
}

async function SearchReportByID() {
    $("#reportTable tbody").empty();
    event.preventDefault();
    const report_id = $("input[name=report_id]").val();
    try {
        const response = await getReportByID(report_id);
        appendReport([response]);
    } catch (error) {
        alert(error);
    }
}



// reportByChange change the input search by
function reportByChange() {
    const reportBy = $('#getReportBy').val();
    const reportContent = {
        "ReportList": `
            <div class="row">
                <div class="col-sm-12">
                    <form role="form" name="ReportList" id="searchReport" onsubmit = "SearchReport();return false;">
                        <label for="content_type">Content Type</label>
                        <div class="form-group">
                            <input type="text" name="content_type" placeholder="Search..." class="form-control">
                        </div>
                        <label for="content_id">Content ID</label>
                        <div class="form-group">
                            <input type="text" name="content_id" placeholder="Search..." class="form-control">
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
                        <label for="reason_type">Reason Type</label>
                        <div class="form-group">
                            <input type="text" name="reason_type" placeholder="Search..." class="form-control">
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
    // empty report_content
    $('#report_content').empty();
    // append report_content
    $('#report_content').append(reportContent[reportBy]);
}