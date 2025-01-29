let currentUUID = null;

supabaseClient.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
        currentUUID = session.user.id;
    } 
});

const tradesSubscription = supabaseClient
    .channel("realtime:Trades")
    .on("postgres_changes", { event: "*", schema: "public", table: "Trades" }, payload => {
        if(payload.new.from === currentUUID || payload.new.to === currentUUID){
            console.log(payload.new);
        }
    })
    .subscribe();
let tradingInventory = [];

async function getInventoryFromUsername(username) {
    const { data, error } = await supabaseClient
        .from("UserData")
        .select("Cards")
        .eq("Username", username)

    if (error) {
        console.error("Error fetching user data:", error);
        return "";
    }

    return data;
}

async function getInventoryFromUUID(uuid) {

}

document.getElementById("startTradeButton").addEventListener("click", async () => {
    const username = document.getElementById("tradeToInput").value;
    tradingInventory = await getInventoryFromUsername(username);
    console.log(tradingInventory);
    document.getElementById("Trade-YourInventory").innerText = JSON.stringify(userData.Cards);
    document.getElementById("Trade-OtherInventory").innerText = JSON.stringify(tradingInventory);
});

window.addEventListener('beforeunload', async () => {
    await supabaseClient.removeChannel(tradesSubscription);
});