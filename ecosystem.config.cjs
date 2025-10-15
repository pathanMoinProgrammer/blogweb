module.exports = {
    apps: [
        {
            name: "backendmindmerits",
            script: "npm start",
            cwd: "/home/aslam/BackendMindmerits",
            env: {
                PORT: 8001
            }
        },
	{
            name: "shopkart",
            script: "npm start",
            cwd: "/home/aslam/shopkart",
            env: {
                PORT: 8002
            }
        },
        {
 	    name: "mindmerits",
	    script: "npm start",
            cwd: "/home/aslam/mind-merits",
            env: {
                PORT: 8003
            }
        },
	{
            name: "blogweb",
            script: "npm start",
            cwd: "/home/aslam/blogweb",
            env: {
                PORT: 8004
            }
        },
    ]
}

