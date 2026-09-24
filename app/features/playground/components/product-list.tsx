"use client"

import { useState } from "react"
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import ProductForm, {
  type ProductFormValues,
} from "@/app/features/playground/components/product-form"
import {
  initialProducts,
  type Product,
} from "@/app/features/playground/data/products-data"

type DialogMode = "add" | "edit" | "view" | null

const formatPrice = (price: number) =>
  `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [dialogMode, setDialogMode] = useState<DialogMode>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productPendingDelete, setProductPendingDelete] =
    useState<Product | null>(null)

  const closeDialog = () => {
    setDialogMode(null)
    setSelectedProduct(null)
  }

  const openAddDialog = () => {
    setSelectedProduct(null)
    setDialogMode("add")
  }

  const openEditDialog = (product: Product) => {
    setSelectedProduct(product)
    setDialogMode("edit")
  }

  const openViewDialog = (product: Product) => {
    setSelectedProduct(product)
    setDialogMode("view")
  }

  const handleCreate = (values: ProductFormValues) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...values,
    }
    setProducts((prev) => [newProduct, ...prev])
    closeDialog()
  }

  const handleUpdate = (values: ProductFormValues) => {
    if (!selectedProduct) return

    setProducts((prev) =>
      prev.map((product) =>
        product.id === selectedProduct.id
          ? { ...product, ...values }
          : product
      )
    )
    closeDialog()
  }

  const handleDelete = () => {
    if (!productPendingDelete) return

    setProducts((prev) =>
      prev.filter((product) => product.id !== productPendingDelete.id)
    )
    setProductPendingDelete(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage your bakery&apos;s product catalog.
          </p>
        </div>

        <Button onClick={openAddDialog}>
          <PlusIcon />
          Add product
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All products</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No products yet. Add your first product to get started.
                  </TableCell>
                </TableRow>
              )}

              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`View ${product.name}`}
                        onClick={() => openViewDialog(product)}
                      >
                        <EyeIcon />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Edit ${product.name}`}
                        onClick={() => openEditDialog(product)}
                      >
                        <PencilIcon />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => setProductPendingDelete(product)}
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add / Edit dialog */}
      <Dialog
        open={dialogMode === "add" || dialogMode === "edit"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogMode === "edit" ? "Edit product" : "Add product"}
            </DialogTitle>
            <DialogDescription>
              {dialogMode === "edit"
                ? "Update the details for this product."
                : "Fill in the details to add a new product."}
            </DialogDescription>
          </DialogHeader>

          <ProductForm
            product={selectedProduct ?? undefined}
            onSubmit={dialogMode === "edit" ? handleUpdate : handleCreate}
            onCancel={closeDialog}
            submitLabel={dialogMode === "edit" ? "Save changes" : "Add product"}
          />
        </DialogContent>
      </Dialog>

      {/* View dialog */}
      <Dialog
        open={dialogMode === "view"}
        onOpenChange={(open) => !open && closeDialog()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
            <DialogDescription>Product details</DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Category</span>
                <Badge variant="secondary">{selectedProduct.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Price</span>
                <span className="font-medium">
                  {formatPrice(selectedProduct.price)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Stock</span>
                <span className="font-medium">{selectedProduct.stock}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Description</span>
                <p className="mt-1">{selectedProduct.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog
        open={!!productPendingDelete}
        onOpenChange={(open) => !open && setProductPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {productPendingDelete?.name}
              </span>
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ProductList
