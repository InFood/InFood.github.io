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

// logic
function appendUser(element) {

    row = "";
    console.log(element);
    
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