import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updatePropertyById = async (
    id,
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

    const property = await prisma.property.updateMany({
        where: { id: id },
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

    if (property.count <= 0) {
        throw new NotFoundError("Property", id);
    } else return property;
};

export default updatePropertyById;