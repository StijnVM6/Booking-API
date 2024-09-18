import { PrismaClient } from "@prisma/client";

const getProperties = async (
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating
) => {
    const prisma = new PrismaClient();

    if (pricePerNight) pricePerNight = Number.parseFloat(pricePerNight);
    if (bedroomCount) bedroomCount = Number(bedroomCount);
    if (bathRoomCount) bathRoomCount = Number(bathRoomCount);
    if (maxGuestCount) maxGuestCount = Number(maxGuestCount);
    if (rating) rating = Number(rating);

    const properties = await prisma.property.findMany({
        where: {
            location: location,
            pricePerNight: pricePerNight,
            bedroomCount: bedroomCount,
            bathRoomCount: bathRoomCount,
            maxGuestCount: maxGuestCount,
            rating: rating
        }
    });

    if (properties.count <= 0) return null;
    else return properties;
};

export default getProperties;