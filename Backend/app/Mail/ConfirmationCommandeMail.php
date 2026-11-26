<?php
namespace App\Mail;

use App\Models\Commande;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ConfirmationCommandeMail extends Mailable
{
    use Queueable, SerializesModels;

    public Commande $commande;

    public function __construct(Commande $commande)
    {
        $this->commande = $commande->load(['user', 'products']);
    }

    public function build()
    {
        return $this->subject('Confirmation de votre commande #' . $this->commande->id . ' - ParaPlus')
            ->view('emails.confirmation');
    }
}