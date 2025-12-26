<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePanierRequest extends FormRequest
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
            'product_id' => 'required|exists:products,id', // le produit doit exister
            'quantite'   => 'required|integer|min:1', 
        ];
    }

    public function messages(): array
    {
        return [
            'product_id.required' => 'Veuillez sélectionner un produit.',
            'product_id.exists'   => 'Le produit sélectionné n’existe pas.',
            'quantite.integer'    => 'La quantité doit être un nombre.',
            'quantite.min'        => 'La quantité doit être au moins 1.',
        ];
    }
}
