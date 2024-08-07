// const URL = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";
const URLcus = "/api/";
// event
// search by change event

// api
// 
// get post by follower /api/v1/user/{user_id}/followee/post option myid
function getPostByRestaurantId(restaurantId, myid) {
    return $.ajax({
        url: URLcus + "api/v1/restaurant/" + restaurantId + "/post",
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        data: {
            "my_id": myid
        }
    })
}

getPostByRestaurantId("42dc5597-e8ab-437c-ba23-3932cf450714", "765d19d7-bd14-4bbb-87ba-40b3e7de42e5").then((res) => {
    appendPost(res.post_list);
})

// get post by restaurant /api/v1/restaurant/{restaurant_id}/post needed myid

// get post by user /api/v1/user/{user_id}/post needed myid

// get post by food-item /api/v1/food_item/{food_item_id}/post needed myid

// get post by post /api/v1/post/{post_id} needed user_id


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

    $('#postTable').footable();
}

// submit post 
function SearchPostByRestaurant() {
    const restaurantId = $("#restaurantId").val();
    const myid = $("#myid").val();
    // getPostByRestaurantId(restaurantId, myid).then((res) => {
    //     appendPost(res.post_list);
    // })
    console.log($('#getPostBy').val());
}

// postByChange change the input search by
function postByChange() {
    const postBy = $('#getPostBy').val();
    // empty post_content
    $('#post_content').empty();
    // append post_content
    switch (postBy) {
        case "Followee":
            console.log("Followee");
        case "Restaurant":
            console.log("Restaurant");
        case "User":
            console.log("User");
        case "Food-Item":
            console.log("Food-Item");
        case "Post-ID":
            console.log("Post-ID");
        default :
            break;
    }
}