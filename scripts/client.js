const money = new Money();
const userData = [
    // ["Student Name", ["Variant0", "Variant1"], ["Pinned"]]
];

function determineValue(card) {
    let price = 0;
    return price;
}

notification({
    title: "Welcome, User!",
    description: "Thanks for visiting my Card Game!",
    delay: 15,
});

const signinTooltip = tooltip({
    dom: document.getElementById("signin"),
    text: "Signing in lets you save your progress!",
    delay: 0,
});
tooltip({
    dom: document.querySelector("#topbar > h2:nth-child(1)"),
    text: "WHAT THE ∑",
    delay: 10,
});

document.getElementById("signin").addEventListener("click", () => {
    customPrompt({
        title: "Sign-In / Register",
        inputs: [
            '<input type="email" placeholder="Email" disabled>',
            '<input type="text" placeholder="Username" disabled>',
            '<input type="password" placeholder="Password" disabled>',
            ["<button disabled>Sign-In / Register</button>", () => {}],
            `<div><p>Or</p></div>`,
            [
                '<button class="sso"><img src="./assets/icons/github-light.svg"> GitHub Sign-In</button>',
                () => {
                    console.log("GitHub Sign-In");
                },
            ],
            [
                '<button disabled class="sso"><img src="./assets/icons/google.svg"> Google Sign-In</button>',
                () => {},
            ],
        ],
    });
});
