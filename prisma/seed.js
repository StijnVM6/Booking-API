import { PrismaClient } from "@prisma/client";
import amenitiesData from "../src/data/amenities.json" assert { type: "json"};
import bookingsData from "../src/data/bookings.json" assert { type: "json"};
import hostsData from "../src/data/hosts.json" assert { type: "json"};
import propertiesData from "../src/data/properties.json" assert { type: "json"};
import reviewsData from "../src/data/reviews.json" assert { type: "json"};
import usersData from "../src/data/users.json" assert { type: "json"};

const prisma = new PrismaClient({ log: ["query", "info", "error"] });

const main = async () => {
    const { users } = usersData;
    const { amenities } = amenitiesData;
    const { bookings } = bookingsData;
    const { hosts } = hostsData;
    const { properties } = propertiesData;
    const { reviews } = reviewsData;

    for (const amenity of amenities) {
        await prisma.amenity.upsert({
            where: { id: amenity.id },
            update: {},
            create: amenity,
        });
    };

    for (const host of hosts) {
        await prisma.host.upsert({
            where: { id: host.id },
            update: {},
            create: host
        });
    };

    for (const user of users) {
        await prisma.user.upsert({
            where: { id: user.id },
            update: {},
            create: user
        });
    };

    for (const property of properties) {
        await prisma.property.upsert({
            where: { id: property.id },
            update: {},
            create: property
        });
    };

    for (const booking of bookings) {
        await prisma.booking.upsert({
            where: { id: booking.id },
            update: {},
            create: booking
        });
    };

    for (const review of reviews) {
        await prisma.review.upsert({
            where: { id: review.id },
            update: {},
            create: review
        });
    };
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })