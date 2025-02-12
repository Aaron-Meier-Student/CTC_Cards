const dataVariants = {
    "TEMPLATE": {
        Chance: 0,
        priceFactor: ["+1","*2.3"],
        builtInComponents: {
            trait: "Template",
            traitColor: "#fff"
        },
        styleComponents: {

        },
        customComponents: {
            location: "",
            content: ""
        }
    },
    "Hexed": {
        Display: "TUP",
        AltDisplay: "",
        Chance: 10,
        AddedValue: 2,
        Multiplier: 1.5,
        Shared: true,
        BaseColor: "#00ff84",
        Pattern: "",
        Changes: {
            border: "6px solid <BASE>",
        },
    },
    "Grayscale": {
        Display: "",
        AltDisplay: "Grayscale",
        Chance: 50,
        AddedValue: 10,
        Multiplier: 2,
        Shared: false,
        BaseColor: "<RANDOM:1-255>",
        Pattern: "",
        Changes: {
            border: "6px solid rgb(<BASE>, <BASE>, <BASE>)",
        },
    },
    "Digital": {
        Display: "",
        AltDisplay: "Digital",
        AddedValue: 15,
        Chance: 75,
        Multiplier: 2,
        Shared: false,
        BaseColor: "rgb(88,66,255)",
        Pattern:
            "https://subcodevs.com/wp-content/uploads/2024/06/Animation.gif",
        Changes: {
            border: "6px solid <BASE>",
        },
    },
    "Fractured": {
        Display: "",
        AltDisplay: "Fractured",
        AddedValue: 20,
        Chance: 85,
        Multiplier: 2,
        Shared: false,
        BaseColor: "rgb(255,255,255)",
        Pattern: "",
        Changes: {
            borderImageSource:
                "url(https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ded4c09d-6f31-4249-b9c5-5918e01082f3/deza8e9-b79fc074-2c89-4214-b0cb-73152b904149.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2RlZDRjMDlkLTZmMzEtNDI0OS1iOWM1LTU5MThlMDEwODJmM1wvZGV6YThlOS1iNzlmYzA3NC0yYzg5LTQyMTQtYjBjYi03MzE1MmI5MDQxNDkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Lr3WO0KgOnsyrH2giFIgRXg2jSa6zJIJPCpwXJpichY)",
            borderImageSlice: "250",
        },
    },
    "Unusual": {
        Display: "",
        AltDisplay: "Unusual",
        AddedValue: 10,
        Chance: 100,
        Multiplier: 10,
        Shared: false,
        BaseColor: "rgb(<RANDOM:1-255>, <RANDOM:1-255>, <RANDOM:1-255>)",
        Pattern:
            "https://static.vecteezy.com/system/resources/thumbnails/048/234/565/small_2x/a-black-and-white-image-of-a-pattern-of-triangles-on-a-transparent-background-png.png",
        Changes: {
            filter: "<BASE>",
            border: "6px solid <BASE>",
        },
    },
    "Universal": {
        Display: "",
        AltDisplay: "Universal",
        AddedValue: 25,
        Chance: 500,
        Multiplier: 25,
        Shared: false,
        BaseColor: "rgb(<RANDOM:1-255>, <RANDOM:1-255>, <RANDOM:1-255>)",
        Pattern: "./Patterns/UniversalPattern.png",
        Changes: {
            filter: "<BASE>",
            border: "6px solid <BASE>",
            boxShadow: "0px 0px 20px 5px <BASE>",
        },
    },
    "FourthDimensional": {
        Display: "",
        AltDisplay: "4th Dimensional",
        AddedValue: 50,
        Chance: 1000,
        Multiplier: 50,
        Shared: false,
        BaseColor: "rgb(0, 85, 255)",
        Pattern: "./4dpattern.png",
        Changes: {
            animation: "colorfulFlicker 2s infinite",
        },
    },
    "Blackhole": {
        Display: "",
        AltDisplay: "Blackhole",
        AddedValue: 50,
        Chance: 5000,
        Multiplier: 75,
        Shared: false,
        BaseColor: "rgb(0, 0, 0)",
        Pattern: "",
        Changes: {
            backgroundColor: "black",
            boxShadow: "0 0 100px 100px black",
            zIndex: "100",
            outline: "4px solid transparent",
            border: "2px solid transparent",
            borderImageSource:
                "linear-gradient(0deg, orange, rgb(255, 214, 139)",
            borderImageSlice: "1",
            animation: "blackhole 1s infinite",
        },
    },
};
deepFreeze(dataVariants);
