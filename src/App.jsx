import { useState } from 'react'
import MyInput from "./components/MyInput";
import myButton from "./components/myButton";
import './App.css'

const App = () => {
  const [users, setUsers] = useState([]); 
  const [formData, setFormData] = useState({ id: null, ad: "", soyad: "", tel: "" });

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ad || !formData.soyad) { 
      alert("Ad ve Soyad alanları boş bırakılamaz.");  
    return;
  }
  if (formData.ad && !/^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/.test(formData.ad || formData.soyad)) {
      alert("Ad ve soyad alanı sadece harflerden oluşmalıdır.");
      return;
    }
    
  if(!formData.tel) {
      alert("Telefon numarası boş bırakılamaz.");
      return;
    }
    if(formData.tel && !/^\d+$/.test(formData.tel)|| formData.tel.length < 11) {
      alert("Telefon numarası sadece rakamlardan oluşmalıdır ve en az 11 haneli olmalıdır.");
      
      return;
    } 

    if (formData.id) {
      
      setUsers(users.map(u => u.id === formData.id ? formData : u));
    
    } else {
      
      setUsers([...users, { ...formData, id: Date.now() }]);
    }
    setFormData({ id: null, ad: "", soyad: "", tel: "" }); // Formu sıfırla
  };

  
  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  
  const startEdit = (user) => {
    setFormData(user);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className= "text-black-800 hover:baseline-central">Rehber Uygulaması</h1>
      
      <form onSubmit={handleSubmit} className="box-form form-container  space-y-4 mb-8">
        <div className="flex flex-col">
        <input name="ad" value={formData.ad} onChange={handleChange} placeholder="Ad" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
        <div className="flex flex-col">
        <input name="soyad" value={formData.soyad} onChange={handleChange} placeholder="Soyad" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>  
        <div className="flex flex-col">
        <input name="tel" value={formData.tel} onChange={handleChange} placeholder="Telefon" className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase" />
        </div>  
        
        <button type="submit" className={`w-full p-2 text-white rounded ${formData.id ? 'bg-orange-500' : 'bg-green-500'}` }>
          {formData.id ? "Güncelle" : "Ekle"}
        </button>
          
      </form>

     
<div className="flex flex-col gap-4 mt-10 items-center">
  {users.map((user) => (
    <div 
      key={user.id} 
      className="bg-white text-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 transform transition-all hover:scale-105"
    >
      
      <div className=" box-form card flex items-center justify-between mb-4 border-b pb-2">
        <h3 className="font-bold text-lg text-blue-600 uppercase tracking-wider">Kişi Kartı</h3>
        <span className="text-[10px] text-gray-400 font-mono">ID: {user.id}</span>
      
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Ad:</span>
          <span className="font-medium">{user.ad}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Soyad:</span>
          <span className="font-medium">{user.soyad}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-gray-500">Telefon:</span>
          <span className="text-blue-500 font-mono">{user.tel}</span>
        </div>
        <div className="pt-2 text-[11px] text-gray-400 italic text-right">
          Eklendi: {user.date ||  new Date().toLocaleString()}  
        </div>
        

      <div className="flex gap-3 mt-6">
        <button 
          onClick={() => startEdit(user)}
          className="flex-1 bg-amber-100 text-amber-600 py-2 rounded-lg font-bold hover:bg-amber-200 transition-colors">Düzenle</button>
        <button 
          onClick={() => deleteUser(user.id)}
          className="flex-1 bg-red-100 text-red-600 py-2 rounded-lg font-bold hover:bg-red-200 transition-colors">Sil</button>
      </div>
    </div>
    </div>
    
  ))}
</div>
    </div>
  );
};

export default App;
