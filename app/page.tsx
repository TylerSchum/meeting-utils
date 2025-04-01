import { ActionButtons } from "@/components/RandomPicker/ActionButtons";
import { AddItemForm } from "@/components/RandomPicker/AddItemForm";
import { Footer } from "@/components/RandomPicker/Footer";
import { Header } from "@/components/RandomPicker/Header";
import { ItemsList } from "@/components/RandomPicker/ItemsList";
import { SelectedItem } from "@/components/RandomPicker/SelectedItem";

export default function NameRandomizer() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-950">
      <div className="w-full max-w-2xl mx-auto bg-gray-900 border border-gray-800 rounded-lg p-6">
        <Header />
        <AddItemForm />
        <ActionButtons />
        <SelectedItem />
        <ItemsList />
        <Footer />
      </div>
    </div>
  );
}
