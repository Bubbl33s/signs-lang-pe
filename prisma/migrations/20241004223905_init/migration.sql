-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "image" TEXT,
    "brand" TEXT NOT NULL DEFAULT 'Generic',
    "material" TEXT NOT NULL DEFAULT 'Plastic',
    "category" TEXT NOT NULL DEFAULT 'Misc',
    "has_discount" BOOLEAN NOT NULL DEFAULT false,
    "discountDesc" TEXT,
    "discountCat" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
