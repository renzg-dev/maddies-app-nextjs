"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { productCategories } from "@/app/features/playground/data/products-data"
import type { Product } from "@/app/features/playground/data/products-data"

export type ProductFormValues = Omit<Product, "id">

const emptyValues: ProductFormValues = {
  name: "",
  category: productCategories[0],
  price: 0,
  stock: 0,
  description: "",
}

const ProductForm = ({
  product,
  onSubmit,
  onCancel,
  submitLabel = "Save product",
}: {
  product?: Product
  onSubmit: (values: ProductFormValues) => void
  onCancel: () => void
  submitLabel?: string
}) => {
  const [values, setValues] = useState<ProductFormValues>(
    product ?? emptyValues
  )

  useEffect(() => {
    setValues(product ?? emptyValues)
  }, [product])

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(values)
      }}
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="product-name">Name</FieldLabel>
          <FieldContent>
            <Input
              id="product-name"
              required
              value={values.name}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, name: event.target.value }))
              }
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="product-category">Category</FieldLabel>
          <FieldContent>
            <Select
              value={values.category}
              onValueChange={(category) =>
                setValues((prev) => ({ ...prev, category }))
              }
            >
              <SelectTrigger id="product-category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {productCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="product-price">Price (₱)</FieldLabel>
          <FieldContent>
            <Input
              id="product-price"
              type="number"
              min={0}
              step="0.01"
              required
              value={values.price}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  price: Number(event.target.value),
                }))
              }
            />
          </FieldContent>
        </Field>

        <Field orientation="responsive">
          <FieldLabel htmlFor="product-stock">Stock</FieldLabel>
          <FieldContent>
            <Input
              id="product-stock"
              type="number"
              min={0}
              required
              value={values.stock}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  stock: Number(event.target.value),
                }))
              }
            />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="product-description">Description</FieldLabel>
          <FieldContent>
            <Textarea
              id="product-description"
              rows={3}
              value={values.description}
              onChange={(event) =>
                setValues((prev) => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
            />
          </FieldContent>
        </Field>
      </FieldGroup>

      <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}

export default ProductForm
