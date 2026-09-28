package local.rubra.game;
import android.test.ActivityInstrumentationTestCase2;
import android.os.SystemClock;
import android.view.MotionEvent;
import org.json.JSONObject;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

public class GameTest extends ActivityInstrumentationTestCase2<MainActivity> {
 public GameTest(){super(MainActivity.class);}
 private MainActivity activity;
 private String js(String code) throws Exception {
  final String[] result={null};CountDownLatch done=new CountDownLatch(1);
  getInstrumentation().runOnMainSync(()->activity.web.evaluateJavascript(code,v->{result[0]=v;done.countDown();}));
  assertTrue("JS timed out",done.await(30,TimeUnit.SECONDS));return result[0];
 }
 private void expect(String code) throws Exception {assertEquals(code,"true",js(code));android.util.Log.i("RUBRA_TEST","PASS "+code);}
 private void ready() throws Exception {for(int i=0;i<240;i++){if("true".equals(js("document.body.dataset.assets==='ready'")))return;SystemClock.sleep(500);}fail("Assets failed: "+js("document.getElementById('saveNotice').textContent"));}
 private void click(String id) throws Exception {
  js("document.getElementById('"+id+"').scrollIntoView({block:'center'})");SystemClock.sleep(250);
  JSONObject pos=new JSONObject(js("(()=>{const r=document.getElementById('"+id+"').getBoundingClientRect();return {x:(r.x+r.width/2)*devicePixelRatio,y:(r.y+r.height/2)*devicePixelRatio}})()"));
  touch((float)pos.getDouble("x"),(float)pos.getDouble("y"),80);SystemClock.sleep(300);
 }
 private void touch(float x,float y,long duration){long t=SystemClock.uptimeMillis();getInstrumentation().sendPointerSync(MotionEvent.obtain(t,t,MotionEvent.ACTION_DOWN,x,y,0));SystemClock.sleep(duration);getInstrumentation().sendPointerSync(MotionEvent.obtain(t,SystemClock.uptimeMillis(),MotionEvent.ACTION_UP,x,y,0));}
 public void testOfflineGameAndTouch() throws Exception {
  activity=getActivity();ready();expect("document.body.classList.contains('android')&&innerWidth>innerHeight");
  expect("!document.getElementById('startButton').disabled&&Object.keys(C.assets).every(id=>assetImages[id].width>0)");
  click("armoryButton");expect("state==='armory'");click("armoryBack");
  click("startButton");expect("state==='characters'&&document.querySelectorAll('[data-portrait]').length>0");
  click("charactersNext");expect("state==='maps'");click("beginRun");expect("state==='playing'&&run.map==='tutorial'");
  SystemClock.sleep(300);expect("getComputedStyle(document.getElementById('mobile')).display!=='none'");
  js("window.touchStartX=player.x");
  JSONObject pos=new JSONObject(js("(()=>{const r=document.getElementById('joystick').getBoundingClientRect();return {x:(r.x+r.width*.8)*devicePixelRatio,y:(r.y+r.height/2)*devicePixelRatio}})()"));
  touch((float)pos.getDouble("x"),(float)pos.getDouble("y"),700);expect("player.x>window.touchStartX+5&&joystick.x===0");
  click("dashTouch");expect("player.dashCooldown>0");click("pauseButton");expect("state==='paused'");
  js("save.gold=321;storeSave()");click("saveQuit");expect("state==='menu'&&save.active!==null");
  click("continueRun");expect("state==='playing'");
  getInstrumentation().runOnMainSync(()->activity.onBackPressed());SystemClock.sleep(300);expect("state==='paused'");
  getInstrumentation().runOnMainSync(()->activity.onBackPressed());SystemClock.sleep(300);expect("state==='playing'");
  getInstrumentation().runOnMainSync(()->getInstrumentation().callActivityOnPause(activity));SystemClock.sleep(300);expect("state==='paused'&&save.active!==null");getInstrumentation().runOnMainSync(()->getInstrumentation().callActivityOnResume(activity));
  click("saveQuit");
  getInstrumentation().runOnMainSync(()->activity.web.reload());ready();expect("save.gold===321&&save.active!==null");
  click("optionsButton");click("openMusicLibrary");expect("state==='musicLibrary'&&document.querySelectorAll('[data-track]').length===11");click("musicBack");click("openBestiary");expect("state==='bestiary'");
 }
}
