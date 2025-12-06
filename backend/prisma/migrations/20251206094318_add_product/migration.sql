-- CreateTable
CREATE TABLE "StockCarrito" (
    "id" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StockCarrito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "title" TEXT,
    "description" TEXT,
    "isFeatured" BOOLEAN DEFAULT false,
    "categoria" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
