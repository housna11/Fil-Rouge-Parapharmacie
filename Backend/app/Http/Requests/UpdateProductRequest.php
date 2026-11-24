<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
        'nom' => 'sometimes|string|max:255',   
        'marque' => 'sometimes|string|max:100',       
        'prix' => 'sometimes|numeric|min:0',         
        'description' => 'nullable|string',          
        'image' => 'nullable|image|max:2048', 
        'stock' => 'sometimes|integer|max:100', 

        ];
    }
}
