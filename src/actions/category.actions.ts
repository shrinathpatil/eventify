"use server";
import { connectToDb } from "@/database";
import { Category } from "@/database/models/category.model";
import { handleError } from "@/lib/utils";
import { CreateCategoryParams } from "./../types/index";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDb();
    const newCategory = await Category.create({ name: categoryName });

    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDb();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (e) {
    handleError(e);
  }
};
