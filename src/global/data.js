export const filterData = [{
        name: "Ride",
        image: require('../../assets/images/ride.png'),
        id: "0"
    },
    {
        name: "Food",
        image: require("../../assets/images/food.png"),
        id: "1"
    },
    {
        name: "Package",
        image: require("../../assets/images/package.png"),
        id: "2"
    },
    {
        name: "Reserve",
        image: require("../../assets/images/reserve.png"),
        id: "3"
    }

];


export const rideData = [{
        street: "32 Olivia Rd",
        area: "Klipfontein 83-Ir,Boksburg",
        id: "0"
    },
    {
        street: "Hughes Industrial Park",
        area: "Hughes,Boksburg",
        id: "1"
    },
    {
        street: "32 Olivia Road",
        area: " East Rand,Ekurhuleni,Gauteng,1459",
        id: "2"
    },
    {
        street: "Total Boksburg",
        area: "35 Atlas Rd,Anderbolt,Boksburg",
        id: "3"
    },
    {
        street: "179 8th Ave",
        area: "Bezuidenhout Valley,Johannesburg",
        id: "4"
    },
];

export const carTypeData = [
    {
        name: "Car",
        group: 2,
        price: 7,
        image: require('../../assets/images/cars/car.png'),
        note: "Affordable.compact rides",
        promotion: 5,
        time: "20:19",
        promo: true,
        seat: 4,
        id: 1
    },
    {
        name: "Suv",
        group: 3,
        price: 5.5,
        image: require('../../assets/images/cars/suv.png'),
        note: "Affordable everyday trips",
        promotion: 0,
        time: "20:20",
        promo: false,
        seat: 4,
        id: 2
    },
    {
        name: "Van",
        group: 0,
        price: 12.6,
        image: require('../../assets/images/cars/van.png'),
        note: "Send and receive packages",
        promotion: 10,
        time: "20:33",
        promo: false,
        seat: 7,
        id: 3
    }
];

export const requestData = [{
        name: "For Me",
        id: 0
    },
    {
        name: "For Someone",
        id: 1
    }

]

export const rideOptions = [{
        name: "Personal",
        icon: "account",
        id: "0"
    },
    {
        name: "Business",
        icon: "briefcase",
        id: "1"
    },

];

export const paymentOptions = [{
        image: require('../../assets/images/visaIcon.png'),
        text: "Debit Card",
    },
    {
        image: require('../../assets/images/cashIcon.png'),
        text: "Cash",
    },
    {
        image: require('../../assets/images/visaIcon.png'),
        text: "PayPal",
    }
]

export const availableServices = ["Car", "SUV", "Van"]

export const carsAround = [
    {
        id: 1,
        type: "Car",
        latitude: 7.221414,
        longitude: 4.774215,
        heading: 90
    },
    {
        id: 2,
        type: "Van",
        latitude: 7.220971,
        longitude: 4.776692,
        heading: 90
    },
    {
        id: 3,
        type: "Car",
        latitude: 7.220971,
        longitude: 4.768710,
        heading: 90
    },
    {
        id: 4,
        type: "Suv",
        latitude: 7.222163,
        longitude: 4.774632,
        heading: 90
    },
    {
        id: 5,
        type: "Van",
        latitude: 40.768310,
        longitude: -111.822420,
        heading: 90
    },
]

export const trips = [
    {
        id: 1,
        origin: "Harmony hostel Kwara state",
        destination: 'Shopping mall, Fate road',
        date: '17 Dec 2022',
        time: '8:30pm',
        price: '$400'
    },
    {
        id: 2,
        origin: "Harmony hostel Kwara state",
        destination: 'Shopping mall, Fate road',
        date: '17 Dec 2022',
        time: '8:30pm',
        price: '$400'
    },
    {
        id: 3,
        origin: "Harmony hostel Kwara state",
        destination: 'Shopping mall, Fate road',
        date: '17 Dec 2022',
        time: '8:30pm',
        price: '$400'
    },
    {
        id: 4,
        origin: "Harmony hostel Kwara state",
        destination: 'Shopping mall, Fate road',
        date: '17 Dec 2022',
        time: '8:30pm',
        price: '$400'
    },
    {
        id: 5,
        origin: "Harmony hostel Kwara state",
        destination: 'Shopping mall, Fate road',
        date: '17 Dec 2022',
        time: '8:30pm',
        price: '$400'
    },
    {
        id: 6,
        origin: "Harmony hostel Kwara state",
        destination: 'Shopping mall, Fate road',
        date: '17 Dec 2022',
        time: '8:30pm',
        price: '$400'
    },
]