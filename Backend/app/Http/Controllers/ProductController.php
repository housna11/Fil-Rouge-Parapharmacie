<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();


        if ($request->marque) {
        $query->where('marque', $request->marque);
        }

        if ($request->recherche) {
        $query->where('nom', 'like', '%' . $request->recherche . '%');
        }

        return $query->get();
    }
     
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProductRequest $request)
{
    $this->authorize('create', Product::class);

    $data = $request->validated();

    if ($request->hasFile('image')) {
            $filePath = $request->file('image')->getRealPath();
            $uploadedImage = Cloudinary::upload($filePath)->getSecurePath();
            $data['image'] = $uploadedImage;
        }

    $product = Product::create($data);

    return response()->json($product, 201); // JSON صالح للـ React
}


    /**
     * Display the specified resource.
     */
    public function show(Product $product, $id)
    {
        return Product::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $this->authorize('update', $product);

       $data = $request->validated();

        $product->update($data);

        return $product;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
       $this->authorize('delete', $product);

        $product->delete();

        return response()->json(['message' => 'Supprime']);

    }

    public function nouveau()
    {
       return Product::OrderBy('created_at', 'desc')->take(9)->get();
    }
}
