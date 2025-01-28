const tradesSubscription = supabaseClient
    .channel("Trades")
    .on("postgres_changes", { event: "*", schema: "public", table: "Trades" }, payload => {
        console.log(payload);
    })
    .subscribe();
let tradingInventory = [];

async function getUUIDFromUsername(username){
    const uuid = await supabaseClient
    .from("auth.users")
    
    return 
}

async function getInventoryFromUUID(uuid) {
    
}

document.getElementById("startTradeButton").addEventListener("click", async () => {
    const uuid = await getUUIDFromUsername(document.getElementById("tradeToInput").value);
    tradingInventory = await getInventoryFromUUID(uuid);
});

window.addEventListener('beforeunload', async () => {
    await supabaseClient.removeChannel(tradesSubscription);
});