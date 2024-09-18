import { PrismaClient } from "@prisma/client";

const createProperty = async (
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    rating,
    hostId
) => {
    const prisma = new PrismaClient();

    const property = await prisma.property.create({
        data: {
            title: title,
            description: description,
            location: location,
            pricePerNight: Number.parseFloat(pricePerNight),
            bedroomCount: Number(bedroomCount),
            bathRoomCount: Number(bathRoomCount),
            maxGuestCount: Number(maxGuestCount),
            rating: Number(rating),
            hostId: hostId
        }
    });

    return property;
};

export default createProperty;