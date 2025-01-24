const supabaseClient = supabase.createClient(
    "https://wnvoetuqfxoejgnpcxwr.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indudm9ldHVxZnhvZWpnbnBjeHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3NTE4MDIsImV4cCI6MjA1MzMyNzgwMn0.QTwN23kU4-1_6naW5hStlRODuGYxPtow91sHQMv-cHE" // Your Supabase Public Anon Key
);

const loginButton = document.getElementById("login");
let SignedIn = false;
let dataloaded = false;

loginButton.addEventListener("click", async () => {
    if (!SignedIn) {
        const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: "github",
        });

        if (error) {
            console.error("Failed to Log-In with GitHub: ", error.message);
        } else {
            console.log("Redirecting to GitHub for login...");
        }
    } else {
        supabaseClient.auth.signOut();
    }
});

supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
        SignedIn = true;
        loginButton.innerText = session.user.user_metadata.user_name;
        if (!dataloaded) ReadUserData();
    } else if (event === "SIGNED_OUT") {
        SignedIn = false;
        loginButton.innerText = "Sign-In with GitHub";
    }
});

async function ReadUserData() {
    try {
        const { data: user, error: userError } =
            await supabaseClient.auth.getUser();

        const { data, error } = await supabaseClient
            .from("UserData")
            .select("*")
            .eq("id", user.user.id);

        if (error) {
            console.error("Error fetching data from UserData:", error.message);
        } else {
            if (data.length > 0) {
                userData = {
                    Money: `${Number(data[0].Money).toFixed(2)}`,
                    Cards: data[0].Cards,
                };
                MoneyLock = false;
                dataloaded = true;
                Money(0);
                updateInventory();
            } else {
                const { data, error } = await supabaseClient
                    .from("UserData")
                    .insert({
                        id: user.user.id,
                        Money: userData.Money,
                        Cards: JSON.stringify(userData.Cards),
                    });
                MoneyLock = false;
                dataloaded = true;
                Money(0);
                updateInventory();
            }
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

async function SaveUserData() {
    try {
        const { data: user, error: userError } =
            await supabaseClient.auth.getUser();

        const { data, error } = await supabaseClient
            .from("UserData")
            .update(userData)
            .eq("id", user.user.id);

        if (error) {
            console.error("Error saving data for UserData:", error.message);
        } else {
            changesDetected = false;
        }
    } catch (err) {
        console.error("Unexpected error:", err);
    }
}

window.onbeforeunload = function (evt) {
    if (!changesDetected) return;
    if (typeof evt == "undefined") {
        evt = window.event;
    }
    if (evt) {
        evt.returnValue = "Data may not be saved.";
    }
    return "Data may not be saved.";
};

setTimeout(() => {
    if (!SignedIn) {
        MoneyLock = false;
        Money(0);
    }
}, 3000);
