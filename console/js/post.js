// const URL = "http://infood-backend-python-env.eba-wf3vms2a.ap-northeast-1.elasticbeanstalk.com/";
const URL = "/api/";
// user test uuid 765d19d7-bd14-4bbb-87ba-40b3e7de42e5 
// restaurant test uuid 42dc5597-e8ab-437c-ba23-3932cf450714
// post test uuid 07c3dba2-a477-494f-8509-84f696edd013

// event
// search by change event

// api
// 
// get post by follower /api/v1/user/{user_id}/followee/post option myid
function getPostByRestaurantId(restaurantId, myid) {
    return $.ajax({
        url: URL + "api/v1/restaurant/" + restaurantId + "/post",
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

